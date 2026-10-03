/**
 * Utilitaires cryptographiques pour garantir :
 * 1. 1 Citoyen = 1 Vote (registre d'émargement)
 * 2. Anonymat absolu du bulletin (séparation stricte de l'urne numérique)
 * 3. Reçu vérifiable par le citoyen
 */

export async function generateSHA256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function generateVoteReceipt(proposalId: string, choice: string, salt: string): Promise<string> {
  const raw = `BALLOT_${proposalId}_${choice}_${salt}_${Date.now()}`;
  const hash = await generateSHA256(raw);
  return `RECEIPT-FR-${hash.substring(0, 16).toUpperCase()}`;
}

export async function generateVoterSignature(citizenId: string, proposalId: string): Promise<string> {
  const raw = `REGISTRY_CHECKIN_${citizenId}_SESSION_${proposalId}`;
  const hash = await generateSHA256(raw);
  return `EMARGEMENT-${hash.substring(0, 12).toUpperCase()}`;
}
