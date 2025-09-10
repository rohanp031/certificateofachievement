# Certificate of Achievement dApp

> A minimal Algorand stateful smart contract that manages digital certificates by storing student names and awards in global state.

## Table of Contents

- [Project Description](#project-description)
- [What it does](#what-it-does)
- [Features](#features)
- [Deployed Smart Contract](#deployed-smart-contract)
- [Contract Interface](#contract-interface)
- [Usage Examples](#usage-examples)
- [Limitations](#limitations)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This project demonstrates a **beginner-friendly stateful Algorand smart contract** built with `@algorandfoundation/algorand-typescript` that provides simple certificate issuance functionality:

- **issueCert**: Issues a certificate by recording a student name and award in the global state.

**Perfect for learning:**
- How to define and update global state with string values
- Writing simple contract methods to store certificate data
- Creating a basic digital certificate system on Algorand blockchain
- Understanding stateful smart contract patterns

## What it does

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `issueCert()` | Issues a certificate by storing student and award data | `name: string`, `award: string` | Certificate confirmation message |

**Global State Variables:**
- `student` → Stores the student's name (default: "none")
- `award` → Stores the award description (default: "none")

### Workflow

1. **Initial State**: Contract starts with `student="none"`, `award="none"`
2. **Certificate Issuance**: Call `issueCert("John Doe", "Excellence in Mathematics")`
3. **State Update**: Global state updates with provided values
4. **Confirmation**: Returns `"Certificate: John Doe got Excellence in Mathematics"`

## Features

- Digital Certificate Management - Issue tamper-proof certificates on blockchain
- Immutable Records - Certificates stored permanently on Algorand
- Simple Interface - Easy-to-use contract methods
- Beginner-Friendly - Perfect starting point for blockchain development
- Low Gas Fees - Built on Algorand's efficient blockchain
- Transparent - All certificate data is publicly verifiable

## Deployed Smart Contract

**Contract Application ID**: TBD (Update after deployment)
**Network**: Algorand Testnet

> Note: Update with your actual Application ID after deployment

## Contract Interface

### Smart Contract Code

```typescript
import { Contract, GlobalState } from '@algorandfoundation/algorand-typescript'

export class certificateofachievement extends Contract {
  // Global state variables
  student = GlobalState<string>({
    key: "student",
    initialValue: "none"
  })

  award = GlobalState<string>({
    key: "award",
    initialValue: "none"
  })

  // Main method to issue certificates
  issueCert(name: string, award: string): string {
    this.student.value = name
    this.award.value = award
    return "Certificate: " + name + " got " + award
  }
}
```

**Key Components:**
- `student`: Stores the certificate recipient's name
- `award`: Stores the award/achievement description
- `issueCert()`: Updates both state variables and returns confirmation

## Usage Examples

### Command Line Interface

```bash
# Issue a certificate for academic excellence
algokit call testnet-app-YOUR_APP_ID issueCert \
  --arg "Sarah Chen" \
  --arg "Dean's List - Fall 2024"

# Issue a certificate for course completion
algokit call testnet-app-YOUR_APP_ID issueCert \
  --arg "Michael Rodriguez" \
  --arg "Certified Algorand Developer"
```

### SDK Integration (Node.js)

```javascript
import algosdk from 'algosdk';

const algodToken = 'your-token';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = 443;

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Issue certificate function
async function issueCertificate(appId, senderAccount, studentName, awardName) {
  const suggestedParams = await algodClient.getTransactionParams().do();

  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    from: senderAccount.addr,
    appIndex: appId,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new TextEncoder().encode("issueCert"),
      new TextEncoder().encode(studentName),
      new TextEncoder().encode(awardName)
    ],
    suggestedParams
  });

  const signedTxn = appCallTxn.signTxn(senderAccount.sk);
  const txId = await algodClient.sendRawTransaction(signedTxn).do();

  return txId;
}
```

## Limitations

### Current Limitations

| Limitation | Impact |
|------------|---------|
| **Single Certificate Storage** | Only stores one certificate at a time |
| **No Access Control** | Anyone can issue certificates |
| **Limited Certificate Data** | Only name + award fields |
| **No Certificate History** | Previous certificates are overwritten |

### Suggested Improvements

**Phase 1: Core Enhancements**
- Multi-Certificate Storage: Use Box Storage for unlimited certificates
- Access Control: Role-based permissions (admin, issuer, student)
- Certificate IDs: Unique identifiers for each certificate

**Phase 2: Advanced Features**
- Enhanced Metadata: Issue date, expiry, institution, grade
- Certificate Templates: Pre-defined certificate types
- Batch Issuance: Issue multiple certificates in one transaction

**Phase 3: Ecosystem Integration**
- NFT Integration: Mint certificates as Algorand NFTs
- IPFS Storage: Store certificate images/PDFs on IPFS
- Verification Portal: Public verification interface

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- AlgoKit CLI (`pip install algokit`)
- Git

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/certificate-of-achievement-dapp.git
cd certificate-of-achievement-dapp

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DEPLOYER_MNEMONIC

# 4. Bootstrap the project
algokit project bootstrap all

# 5. Run tests
npm test

# 6. Deploy to testnet
algokit project deploy testnet
```

### Environment Setup

Create a `.env` file in the project root:

```env
# Algorand Testnet Configuration
DEPLOYER_MNEMONIC="your 25 word mnemonic phrase here"
ALGOD_TOKEN=""
ALGOD_SERVER="https://testnet-api.algonode.cloud"
ALGOD_PORT="443"
INDEXER_SERVER="https://testnet-idx.algonode.cloud"
INDEXER_PORT="443"
```

### Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test contract compilation
npm run build

# Lint code
npm run lint
```

### Project Structure

```
certificate-of-achievement-dapp/
├── smart_contracts/              # Smart contract source code
│   ├── certificateofachievement/
│   │   ├── contract.ts           # Main contract code
│   │   └── deploy-config.ts      # Deployment configuration
│   └── index.ts                  # Contract exports
├── tests/                        # Test files
├── .algokit/                     # AlgoKit configuration
├── package.json                  # Node.js dependencies
├── .env                          # Environment variables
└── README.md                     # This file
```

### Troubleshooting

**Common Issues:**

1. **Mnemonic Error**
   ```
   Error: the mnemonic contains a word that is not in the wordlist
   ```
   - Ensure your mnemonic is exactly 25 words
   - Check for typos or extra spaces
   - Generate new mnemonic: `algokit goal account new`

2. **Network Connection Issues**
   ```
   TypeError: fetch failed
   ```
   - Check internet connectivity
   - Verify AlgoNode endpoints are accessible
   - Try switching to different RPC endpoints

3. **Insufficient Balance**
   ```
   Error: account has insufficient balance
   ```
   - Fund your account with testnet ALGOs
   - Visit: https://bank.testnet.algorand.network/

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Update documentation for any API changes
- Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ on Algorand**
