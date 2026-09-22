import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

export interface DocumentChunk {
  id: string;
  title: string;
  category: string;
  content: string;
  vector?: number[];
}

// Curated High-Density Scientific and Academic Dataset
const CURATED_SCIENTIFIC_DATASET: Omit<DocumentChunk, 'id'>[] = [
  {
    title: "Topological Qubits and Non-Abelian Anyons in Quantum Computing",
    category: "Quantum Physics",
    content: "Topological quantum computing relies on the physical properties of non-Abelian anyons, which are quasi-particles that exist in two-dimensional space. Unlike standard qubits which are highly susceptible to environmental noise and decoherence, topological qubits store quantum information non-locally by braiding world-lines of anyons. The primary advantage of this architecture is its inherent fault tolerance: local perturbations and thermal fluctuations cannot easily undo the braided topological state. Majorana fermions, occurring at the boundaries of topological superconductors, are leading candidates for building these qubits. Operating these quantum systems requires keeping temperatures near absolute zero (sub-millikelvin range) to prevent trivializing the topological phases through thermal excitations."
  },
  {
    title: "CRISPR-Cas9 Gene Drives and Homology-Directed Repair Mechanisms",
    category: "Molecular Biology",
    content: "The CRISPR-Cas9 system has revolutionized genetic engineering by enabling site-specific double-stranded breaks (DSBs) in DNA. Once a break is introduced, the cell repairs it using either Non-Homologous End Joining (NHEJ) or Homology-Directed Repair (HDR). To achieve precise edits, researchers rely on HDR, which uses a repair template to insert specific genetic sequences. Synthetic gene drives leverage CRISPR-Cas9 by inserting the Cas9 machinery and guide RNA directly into the target locus. Consequently, when the organism mates, the gene drive copies itself onto the homologous chromosome of the offspring, converting heterozygotes to homozygotes. This results in super-Mendelian inheritance, allowing genetic traits to propagate through entire wild populations with nearly 100% transmission rates, prompting intensive debate on ecological containment and ethical safeguards."
  },
  {
    title: "Thermodynamics of Black Holes and the Holographic Principle",
    category: "Astrophysics & Cosmology",
    content: "Black hole thermodynamics merges general relativity with quantum field theory. Jacob Bekenstein and Stephen Hawking postulated that black holes possess entropy proportional to the area of their event horizon, defined by the formula S = (k_B * A) / (4 * \u2113_P^2), where A is the horizon area and \u2113_P is the Planck length. This suggests that the maximum information content of any region of space scales with its boundary surface area rather than its volume. This realization led to the Holographic Principle, popularized by Gerard 't Hooft and Leonard Susskind. The principle asserts that our three-dimensional universe can be mathematically described as a projection from a two-dimensional boundary. In quantum gravity, the holographic AdS/CFT correspondence provides a concrete realization of this, mapping gravity in anti-de Sitter space to a lower-dimensional conformal field theory."
  },
  {
    title: "Mathematical Foundations of Transformer Self-Attention Mechanisms",
    category: "Computer Science & AI",
    content: "The Transformer model relies on the self-attention mechanism to process sequential data in parallel. For an input matrix of token representations X, attention calculates queries (Q), keys (K), and values (V) via linear projections: Q = XW_Q, K = XW_K, and V = XW_V. The attention weights are computed using a scaled dot-product: Attention(Q, K, V) = softmax((Q * K^T) / \u221ad_k) * V, where d_k represents the dimensionality of the keys. Scaling by \u221ad_k is crucial to prevent the dot products from growing excessively large, which would push the softmax function into regions with dangerously small gradients. Multi-Head Attention extends this by performing the operation across multiple subspace projections in parallel, enabling the model to jointly attend to information from different representation spaces at different positions."
  },
  {
    title: "Weakly Interacting Massive Particles (WIMPs) and Dark Matter Detection",
    category: "Astrophysics & Cosmology",
    content: "Weakly Interacting Massive Particles (WIMPs) remain one of the most compelling explanations for dark matter. WIMPs are hypothetical particles that interact solely via gravity and the weak nuclear force, possessing masses typically between 10 GeV and 1 TeV. Evidence for their existence arises from galactic rotation curves, gravitational lensing, and the Cosmic Microwave Background (CMB). Direct detection experiments, such as LUX-ZEPLIN (LZ) and XENONnT, operate ultra-pure liquid xenon target chambers deep underground to shield from cosmic rays. These detectors look for the faint scintillation light and ionization charge produced when a WIMP scatters off a xenon nucleus. Indirect detection searches, meanwhile, look for gamma-rays, neutrinos, or antimatter produced in outer space when WIMPs annihilate in regions of high dark matter density, such as the Galactic Center."
  },
  {
    title: "Epigenetic Regulation via Histone Methylation and Chromatin Remodeling",
    category: "Genetics",
    content: "Epigenetics refers to heritable changes in gene expression that do not involve alterations to the underlying DNA sequence. Two main mechanisms govern this: DNA methylation and histone modification. DNA methyltransferases attach methyl groups directly to cytosine bases, typically silencing gene transcription. Histone modification occurs on the amino-terminal tails of histone proteins around which DNA is wrapped. For instance, histone methylation (e.g., H3K4me3 or H3K27me3) can either activate or repress transcription by modifying how tightly DNA is bound. Highly condensed, transcriptionally inactive DNA is termed heterochromatin, while loosely packed, active DNA is euchromatin. ATP-dependent chromatin remodeling complexes physically slide, eject, or restructure nucleosomes to expose promoters, allowing RNA polymerase and transcription factors access to initiate transcription in response to environmental cues."
  },
  {
    title: "Deuterium-Tritium Fusion and Magnetic Confinement in Tokamaks",
    category: "Fusion Energy",
    content: "Nuclear fusion promises near-limitless, clean energy by merging light isotopes. The most accessible reaction combines Deuterium (D) and Tritium (T) to form Helium-4 and a highly energetic neutron (14.1 MeV) at temperatures exceeding 100 million Kelvin. Achieving net energy gain requires satisfying the Lawson Criterion, which states that the product of plasma density, temperature, and confinement time must exceed a specific threshold. Tokamaks achieve this confinement using helical magnetic fields created by combining strong toroidal field coils, a central solenoid inducing a poloidal field, and poloidal field coils for shaping. The primary challenge is plasma instability; magnetic turbulence and Edge Localized Modes (ELMs) can cause plasma to escape containment and damage the reactor's first wall, requiring advanced divertor designs and liquid metal coatings."
  },
  {
    title: "3D Gaussian Splatting and Implicit Volumetric Representations",
    category: "Computer Science & AI",
    content: "3D Gaussian Splatting represents a breakthrough in real-time novel view synthesis from sparse photographs. Traditional NeRFs (Neural Radiance Fields) represent scenes as continuous implicit volumetric functions queried via MLP neural networks, leading to slow rendering times. 3D Gaussian Splatting, by contrast, models the scene using millions of 3D Gaussians defined by position, covariance, color, and opacity. These Gaussians are projected onto a 2D image plane using a highly optimized tile-based rasterizer. During training, the parameters of these Gaussians are optimized via gradient descent while adaptively splitting or pruning Gaussians in under-reconstructed or over-populated regions. This tile-based splatting technique allows for real-time rasterization exceeding 100+ frames per second at high resolutions, matching or exceeding the visual quality of continuous neural fields."
  },
  {
    title: "The Riemann Hypothesis and Prime Number Distribution Functions",
    category: "Mathematics",
    content: "The Riemann Hypothesis, first proposed by Bernhard Riemann in 1859, is one of the most famous unsolved problems in mathematics. It concerns the non-trivial zeros of the Riemann zeta function, defined for complex numbers s with Re(s) > 1 as \u03b6(s) = \u2211 (1 / n^s). The zeta function can be analytically continued to other complex values. The hypothesis asserts that all non-trivial zeros of \u03b6(s) lie on the critical line Re(s) = 1/2. The location of these zeros is deeply connected to the distribution of prime numbers. If the hypothesis is correct, it proves that the error term in the Prime Number Theorem is as small as possible, implying that prime numbers are distributed as regularly as possible, behaving statistically like a quantum chaotic system."
  },
  {
    title: "Quantum Coherence and Exciton Energy Transfer in Photosynthesis",
    category: "Biophysics",
    content: "In plant biology, photosynthetic light-harvesting complexes transfer energy from absorbed photons to reaction centers with a quantum efficiency near 100%. Experiments using ultrafast spectroscopy suggest that this extreme efficiency is aided by quantum coherence. In the Fenna-Matthews-Olson (FMO) complex found in green sulfur bacteria, excitation is not transferred as a classical, step-by-step 'random walk.' Instead, the exciton behaves like a wave, exploring multiple physical pathways simultaneously. This quantum superposition allows the energy to find the most efficient path to the reaction center, bypassing local traps. While quantum states are highly fragile in warm, wet biological environments, natural proteins have evolved to act as structured vibrational baths, protecting and even prolonging exciton coherence to maximize solar capture."
  }
];

export class VectorDatabase {
  private chunks: DocumentChunk[] = [];
  private dbPath: string;
  private isInitialized = false;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'data', 'vector_db.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory() {
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Initializes the vector database.
   * Loads cached vectors from disk or computes them using Gemini if needed.
   */
  public async initialize(aiClient: GoogleGenAI | null) {
    if (this.isInitialized) return;

    try {
      // 1. Try to load cached database from disk
      if (fs.existsSync(this.dbPath)) {
        try {
          const raw = fs.readFileSync(this.dbPath, 'utf8');
          this.chunks = JSON.parse(raw);
          
          // Verify we have all current curated documents and they have vectors
          const hasAllVectors = CURATED_SCIENTIFIC_DATASET.every(curated => 
            this.chunks.some(chunk => chunk.title === curated.title && chunk.vector && chunk.vector.length > 0)
          );

          if (hasAllVectors && this.chunks.length > 0) {
            console.log(`[VectorDB] Loaded ${this.chunks.length} cached vector document chunks.`);
            this.isInitialized = true;
            return;
          }
        } catch (readErr) {
          console.warn('[VectorDB] Failed to parse cached vector_db.json, re-building...', readErr);
        }
      }

      // 2. Initialize chunks from dataset
      this.chunks = CURATED_SCIENTIFIC_DATASET.map((doc, idx) => ({
        id: `chunk-${idx}`,
        ...doc
      }));

      // 3. Compute vector embeddings if AI client is available
      if (aiClient) {
        console.log('[VectorDB] Generating high-density vector embeddings using gemini-embedding-2-preview...');
        for (const chunk of this.chunks) {
          try {
            const embedResponse = await aiClient.models.embedContent({
              model: 'gemini-embedding-2-preview',
              contents: chunk.content
            });

            const embedding = embedResponse.embeddings?.[0]?.values;
            if (embedding && Array.isArray(embedding)) {
              chunk.vector = embedding;
            }
          } catch (embedErr: any) {
            console.error(`[VectorDB] Error embedding chunk "${chunk.title}":`, embedErr.message);
          }
        }

        // Save populated vectors to disk
        fs.writeFileSync(this.dbPath, JSON.stringify(this.chunks, null, 2), 'utf8');
        console.log(`[VectorDB] Cached ${this.chunks.filter(c => c.vector).length} embeddings to disk.`);
      } else {
        console.warn('[VectorDB] No Gemini client provided during initialization; running in keyword-fallback mode.');
      }

      this.isInitialized = true;
    } catch (err: any) {
      console.error('[VectorDB] Failed to initialize VectorDatabase:', err);
      // Fallback: load plain chunks
      this.chunks = CURATED_SCIENTIFIC_DATASET.map((doc, idx) => ({
        id: `chunk-fb-${idx}`,
        ...doc
      }));
      this.isInitialized = true;
    }
  }

  /**
   * Performs semantic vector search or high-quality keyword fallback search.
   */
  public async search(aiClient: GoogleGenAI | null, query: string, limit = 3): Promise<{ chunk: DocumentChunk; score: number }[]> {
    if (!query || !query.trim()) return [];

    // Attempt actual vector search if query embedding succeeds
    if (aiClient && this.chunks.some(c => c.vector && c.vector.length > 0)) {
      try {
        const queryResponse = await aiClient.models.embedContent({
          model: 'gemini-embedding-2-preview',
          contents: query
        });

        const queryVector = queryResponse.embeddings?.[0]?.values;
        if (queryVector && Array.isArray(queryVector)) {
          const results = this.chunks
            .filter(chunk => chunk.vector && chunk.vector.length > 0)
            .map(chunk => {
              const score = this.cosineSimilarity(queryVector, chunk.vector!);
              return { chunk, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);

          console.log(`[VectorDB] Vector search completed. Top score: ${results[0]?.score.toFixed(4)}`);
          return results;
        }
      } catch (err: any) {
        console.error('[VectorDB] Vector query embedding failed, falling back to TF-IDF matching:', err.message);
      }
    }

    // High-quality Fallback keyword-matching search
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const results = this.chunks.map(chunk => {
      let matches = 0;
      const contentLower = chunk.content.toLowerCase();
      const titleLower = chunk.title.toLowerCase();

      for (const word of queryWords) {
        if (contentLower.includes(word)) matches += 1;
        if (titleLower.includes(word)) matches += 2; // heavier weight for title match
      }

      // Simple score normalization
      const score = matches > 0 ? (matches / (queryWords.length + 2)) : 0;
      return { chunk, score };
    })
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

    return results;
  }

  /**
   * Calculates cosine similarity between two numerical vectors.
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const vectorDbInstance = new VectorDatabase();
