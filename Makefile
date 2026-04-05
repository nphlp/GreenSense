.PHONY: setup-env

# Generate env files from env/env.config.mjs (or copy example if missing)
setup-env:
	@node scripts/setup-env.mjs
