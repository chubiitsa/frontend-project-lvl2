install:
	npm install

installCI:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm run test

watch:
	npm run test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
