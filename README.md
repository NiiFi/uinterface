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
docker run --name nginx -d -p 80:8080 {image_name}
```

## Deprecated

### Deploy to Netlify

At this point we are using netlify for managing deployment. You should have account on [Netlify](https://app.netlify.com/login/email) and make sure you are part of our company team (Contact support for this). Following are the pre-requisite that needs to be fulfilled once.

For Release Process refer to [this document](https://vodworks.atlassian.net/wiki/spaces/OM/pages/1708556289/UInterface)

- **1. Login to Netlify via CLI**

  Run this command to login to your netlify account via cli

  ```bash
    yarn netlify login
  ```

- **2. Link Netlify site**

  Run this command to link to netlify site

  ```bash
  yarn netlify link
  ```

  NOTE: Site name is **dev-niifi-interface**

#### Draft Deployment

To deploy project to draft link you should run this command

```bash
yarn deploy
```
