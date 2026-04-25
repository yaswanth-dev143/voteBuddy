/**
 * @fileoverview Claude API Integration for Ballot Decoding.
 */

import Anthropic from '@anthropic-ai/sdk';
import { APIError } from './error-handler';
import { DecodedBallotMeasure } from '@/types/election';

// Initialize the SDK - it safely checks for the API key in process.env
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

// Helper to check initialization
function ensureAnthropic() {
  if (!anthropic) {
    throw new APIError('Anthropic API key is not configured.', 500, 'CONFIG_ERROR');
  }
  return anthropic;
}

export async function translateBallotMeasure(
  measureText: string,
  targetGradeLevel: number = 8
): Promise<string> {
  const client = ensureAnthropic();

  try {
    const response = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: `You are an expert civic educator. Your task is to translate complex legal ballot measures into plain English at a grade ${targetGradeLevel} reading level. Be completely non-partisan and unbiased. State clearly what a "Yes" vote means and what a "No" vote means.`,
      messages: [
        {
          role: 'user',
          content: `Please translate the following ballot measure text into plain English:\n\n${measureText}`,
        },
      ],
    });

    // Anthropic API returns content as an array of blocks
    const contentBlock = response.content[0];
    if (contentBlock.type === 'text') {
      return contentBlock.text;
    }
    
    throw new Error('Unexpected response format from Claude API');
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new APIError('Failed to translate ballot measure', 500, 'AI_SERVICE_ERROR');
  }
}

export async function explainVotingImpact(measure: string): Promise<{ yes: string; no: string }> {
  const client = ensureAnthropic();

  try {
    const response = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      system: 'You are an objective civic educator. Explain the practical impact of a YES vote and a NO vote on the given measure. Keep it under 2 sentences each. Format your response exactly as JSON: {"yes": "...", "no": "..."}',
      messages: [{ role: 'user', content: measure }],
    });

    const contentBlock = response.content[0];
    if (contentBlock.type === 'text') {
      try {
        const jsonMatch = contentBlock.text.match(/\{[\s\S]*\}/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : contentBlock.text);
        return {
          yes: parsed.yes || 'A yes vote approves the measure.',
          no: parsed.no || 'A no vote rejects the measure.',
        };
      } catch (e) {
        throw new Error('Failed to parse Claude JSON response');
      }
    }
    throw new Error('Unexpected response format');
  } catch (error) {
    console.error('Impact parsing error:', error);
    return { yes: 'Information unavailable.', no: 'Information unavailable.' };
  }
}

export async function detectConfusingLanguage(text: string): Promise<string[]> {
  const client = ensureAnthropic();

  try {
    const response = await client.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 512,
      system: 'Extract up to 3 confusing, legal, or ambiguous phrases from the following text. Return ONLY a JSON array of strings, e.g., ["phrase 1", "phrase 2"].',
      messages: [{ role: 'user', content: text }],
    });

    const contentBlock = response.content[0];
    if (contentBlock.type === 'text') {
      try {
        const jsonMatch = contentBlock.text.match(/\[[\s\S]*\]/);
        return JSON.parse(jsonMatch ? jsonMatch[0] : '[]');
      } catch (e) {
        return [];
      }
    }
    return [];
  } catch (error) {
    return [];
  }
}

/**
 * Combines all AI processing into a single enriched DecodedBallotMeasure object.
 */
export async function decodeFullMeasure(id: string, title: string, originalText: string): Promise<DecodedBallotMeasure> {
  const [decodedText, impact, confusingPhrases] = await Promise.all([
    translateBallotMeasure(originalText, 8),
    explainVotingImpact(originalText),
    detectConfusingLanguage(originalText)
  ]);

  return {
    id,
    title,
    originalText,
    decodedText,
    yesImpact: impact.yes,
    noImpact: impact.no,
    confusingPhrases,
    readingLevel: 8
  };
}
