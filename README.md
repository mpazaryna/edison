# Edison

## A Monorepo for Systematic LLM Experimentation and Development

Named after Thomas Edison's approach to methodical experimentation and detailed record-keeping, this monorepo serves as a central repository for diverse LLM tasks, experiments, and applications across multiple programming languages and tools.

## Philosophy

Like Edison's notebooks that documented thousands of experiments and ideas, this repository aims to:

- **Centralize knowledge** across different LLM domains and projects
- **Enable cross-pollination** of ideas between seemingly unrelated experiments
- **Track the evolution** of techniques and approaches over time
- **Maintain focus** on practical applications and results

## Structure

The repository is organized into the following top-level directories:

```
edison/
├── experiments/         # Systematic deep dives by concept
│   ├── embeddings/      # Vector embedding experiments
│   ├── rag/             # Retrieval augmented generation
│   ├── fine-tuning/     # Model fine-tuning projects
│   └── prompt-engineering/ # Structured prompt testing
│
├── models/              # Model-specific implementations
│   ├── llama/           # Llama model experiments
│   ├── claude/          # Claude-specific implementations
│   ├── mistral/         # Mistral-based projects
│   └── gpt/             # OpenAI model investigations
│
├── applications/        # Practical applications and use cases
│   ├── chatbots/        # Conversational agents
│   ├── search/          # Semantic search implementations
│   ├── content-generation/ # Creative writing and content tools
│   └── code-assistants/ # Programming helpers
│
├── tooling/             # Shared utilities and infrastructure
│   ├── evaluation/      # Metrics and evaluation frameworks
│   ├── data-processing/ # ETL pipelines for training/fine-tuning
│   ├── deployment/      # Containerization and serving solutions
│   └── viz/             # Visualization tools for model outputs
│
├── libraries/           # Reusable code across projects
│   ├── api-clients/     # Wrappers for various LLM APIs
│   ├── prompts/         # Reusable prompt templates
│   └── utils/           # Common utilities
│
├── notebooks/           # Edison-style experimental documentation
│   ├── research/        # Research notes and literature reviews
│   ├── explorations/    # Quick experiments and ideas
│   └── learnings/       # Documented insights and takeaways
│
└── .github/             # CI/CD workflows and GitHub configurations
```

## Working with this Monorepo

### Recommended Approach

For optimal experience with AI coding assistants (like Cursor or Windsurf):

1. Clone the entire repository to maintain the full context
2. Open **individual folders** in separate windows of your editor/AI tool when working on specific projects
3. This provides focused context for AI tools while maintaining the benefits of the monorepo structure

### Project Guidelines

When adding a new project:

1. Place it in the most appropriate top-level category
2. Include a clear README.md with:
   - Purpose and goals
   - Setup instructions
   - Usage examples
   - References to related projects within the monorepo

### Dependencies

- Use relative imports for internal dependencies when appropriate
- For shared code used across multiple projects, consider moving it to the `libraries/` directory
- Document external dependencies in each project's README.md

### Documentation

- Add detailed comments to experimental code
- Keep a record of insights in Markdown files
- Use the `notebooks/` directory for extended thoughts and explorations
- Follow the "Edison notebook" philosophy by documenting both successes and failures

## Contribution Guidelines

1. Create focused, single-purpose commits
2. Use descriptive branch names that indicate the category and purpose
3. Reference related projects or experiments in commit messages when applicable
4. Document any significant findings or patterns in the appropriate notebook directory

## License

[Specify your license information here]

---

*"I have not failed. I've just found 10,000 ways that won't work." - Thomas Edison*