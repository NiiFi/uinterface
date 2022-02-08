# Interface

[Unit Tests]()
[Integration Tests]()
[Lint]()
[Release]()
[Crowdin]()

An open source interface for niFii -- a protocol for decentralized exchange of Ethereum tokens.

- Website:
- Interface:
- Docs:
- Twitter:
- Reddit:
- Email:
- Discord:
- Whitepapers:
  -

## How to run the project locally

Step 1: Clone this repository:

```bash
git clone git@github.com:NiiFi/uinterface.git
```

Step 2: Install dependencies:

```bash
yarn install
```

Step 3: Build the i18n files:

```bash
yarn i18n:extract
yarn i18n:compile
```

Step 4: Run the development server:

```bash
yarn start
```

Note: This step might take a couple of minutes.

## Containerization

### Docker

#### Building image

```bash
docker build -t {image_name} .
```

#### Running image

```bash
docker run --rm -p 8080:80 {image_name}
```
