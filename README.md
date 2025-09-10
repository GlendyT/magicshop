# Magic Shop 

A BTS-themed interactive web application featuring multiple games, photo editing tools, and fan experiences built with Next.js.

## ✨ Features

### 🎮 Interactive Games
- **Tetris** - BTS-themed block puzzle game
- **Rock Paper Scissors** - Classic game with BTS styling
- **Tic Tac Toe** - Strategic game experience
- **Seokjin Fishing Game** - Interactive fishing mini-game

### 📸 Photo Tools
- **Photobooth** - Create custom photos with BTS frames
- **Polaroid Generator** - Generate vintage-style polaroid photos
- **Image Cropping** - Advanced photo editing capabilities

### 🎉 Special Features
- **Festa 2025** - BTS anniversary celebration content
- **V Passport** - Virtual passport with travel stamps
- **Love Notes** - Valentine's themed message creator
- **Sugaverse** - Agust D themed experience
- **Hobipalooza** - J-Hope concert themed content
- **(V)irthday** - V's birthday celebration features

### 🎨 UI/UX Features
- Dark/Light mode toggle
- Responsive design for all devices
- GSAP animations and transitions
- Interactive door opening animation on homepage

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd magicshop

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

```bash
# Run Jest tests
npm run test

# Run Playwright E2E tests
npm run test:playwright
```

## 🛠️ Tech Stack
|**Technology** | **Version** | **Purpose** |
|-----------|---------|---------|
|**Next.js**|	^15.3.1|	React framework and routing|
|**React**|	^19.0.0	|UI library|
|**TypeScript**	|^5|Type safety
|**TailwindCSS**	|^4	|Utility-first CSS framework|
|**GSAP**	|^3.13.0	|Animation library|
|**html2canvas-pro**|	^1.5.8|Image generation|
|**react-easy-crop**|	^5.4.1	|Image cropping|

## Testing and Development
|**Tool** |	Version	| Purpose|
|-----------|---------|---------|
|**Jest**	| ^29.7.0 |	Unit testing |
|**Playwright**	|^1.52.0|	E2E testing|
|**ESLint**	|^9|	Code linting
|**Babel**	|^7.27.0|	JavaScript compilation|

## SOLID Principles
---
**Single Responsability Principle (SRP)**: Each class or utility component has a single, well-defined responsability:
- `RequestInfoProvider.tsx`: Focuses solely on maniging form states, user input, and download operations.
- `InputNameUtils.tsx`: Handles only name input functionality with validation and character counting.
- `RadioOptionsUtils.tsx`: Focuses solely on radio button selection logic and rendering.
- `ButtonUtils.tsx`: Handles only button rendering with configurable props.
- `DownloadImageUtils.tsx`: Manages image downloading functionality independently.
- `TicTacToe Board Class`: Manages only game board logic, winning conditions, and board state.
---
**Open/Closed Principle (OCP)**: This keeps components exemplifies by being open for extension through props while closed for modifications. Multiple components extends its functionality without chaning the source code.
- `PhotoButton.tsx`: Extends ButtonUtils with photobooth-specific styling and behavior.
- `ButtonControls.tsx`: Extends ButtonUtils with game control-specific icons and conditional styling.
- `Board.tsx`: The clone method speñcifically enables extension by creating new instances with the same state, allowing to extend functionatily without changing the original class.
---
**Dependency Inversion Principle (DIP)**: It implements DIP through its context provider hierarchy and custom hooks pattern. DIP states that high-level modules should not depend on low-level modules. Both should depend on abstractions:
- ` layout.tsx`, `Provider Hierarchy`: Dependencies are injected through a layered context provider system.
- `useDarkMode.tsx`, `Hook Abstractions`: Compoents depend on custom hooks rather than direct context usage, such as useDarkMode abstracting DarkModeContext.
- `Formulario.tsx`, `Component Dependencies`: Components like Formulario depend on abstracted hooks rather than concrete implementations.
- `index.ts`, `RequestInfoProvider.tsx`: High-Level compoents don't depend on concrete provider implementations but rather on the context abstraction. The `RequestInfoContextType` interface defines the abstraction and the `RequestInfoProvider implements this abstraction`
---
**Interface Segregation Principle(ISP)**: It follows the ISP through focused type definitions and context interfaces.
- `index.ts`, `Specialized Context Types`: Each context has a specific interface tailored to its domain (TetrisContextType, PhotoboothContextType, etc) rather than one large interface.
- `index.ts`, `Focused Component Props`: Components receive only the props they need, such as InputNameProps containing only name input-specific properties.

**Liskov Substitution Principle (LSP)**: While the code does not show explicit class inheritance, it demonstrates LSP through the consistent context provider pattern. All providers follow the same structural contract, where any provider can be substituted in the provider hierarchy without breaking the application.
- `index.ts`, `AllProvidersProps`: Ensures that all providers can be used interhcangeably in the component tree.
---
**NOTES**
- SRP is achieved through focused, single-purpose components and hooks
- OCP is demonstrated through extensible class designs and consistent patterns
- LSP is shown through consistent interfaces and provider contracts
- ISP is evident in the small, focused TypeScript interfaces
- DIP is implemented through React's context system and abstraction layers.
* These principles help make the codebase maintainable, testable, and scalable across the various BTS-themed interactive features and content generators.


## 📱 Responsive Design
Fully optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 📁 Project Structure
```
magicshop/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (V)irthday/        # V's birthday celebration page
│   │   ├── festa/             # BTS Festa 2025 content
│   │   ├── hobipalooza/       # J-Hope concert experience
│   │   ├── hopeisback/        # J-Hope discharge celebration
│   │   ├── lovenotes/         # Valentine's message creator
│   │   ├── photobooth/        # Photo editing with BTS frames
│   │   ├── polaroid/          # Vintage polaroid generator
│   │   ├── rps/               # Rock Paper Scissors game
│   │   ├── seokjin/           # Jin's fishing mini-game
│   │   ├── sugaverse/         # Agust D themed experience
│   │   ├── tetris/            # BTS-themed Tetris game
│   │   ├── tictactoe/         # Strategic Tic Tac Toe
│   │   ├── vpassport/         # Virtual travel passport
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Homepage with door animation
│   ├── context/               # React Context Providers
│   │   ├── DarkModeProvider.tsx     # Theme switching logic
│   │   ├── DownloadProvider.tsx     # Image download functionality
│   │   ├── FishProvider.tsx         # Fishing game state
│   │   ├── FlipProvider.tsx         # Card flip animations
│   │   ├── ImageCropProvider.tsx    # Photo cropping state
│   │   ├── PhotoboothProvider.tsx   # Photobooth functionality
│   │   ├── RequestInfoProvider.tsx  # Form data management
│   │   ├── RPSProvider.tsx          # Rock Paper Scissors logic
│   │   ├── TetrisProvider.tsx       # Tetris game state
│   │   └── TicTacToeProvider.tsx    # Tic Tac Toe game logic
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useDarkMode.tsx          # Dark/light mode toggle
│   │   ├── useDownload.tsx          # Image download utilities
│   │   ├── useFish.tsx              # Fishing game mechanics
│   │   ├── useFlip.tsx              # Animation controls
│   │   ├── useImageCrop.tsx         # Photo cropping logic
│   │   ├── usePhotobooth.tsx        # Photo editing features
│   │   ├── useRequestInfo.tsx       # Form state management
│   │   ├── useRPS.tsx               # Game logic hooks
│   │   ├── useTetris.tsx            # Tetris game mechanics
│   │   └── useTicTacToe.tsx         # Board game logic
│   ├── types/                 # TypeScript Definitions
│   │   └── index.ts                 # Centralized type exports
│   └── utils/                 # Utility Components & Functions
│       ├── Data/                    # Static data and configurations
│       ├── gift2/                   # Gift-related utilities
│       ├── ButtonUtils.tsx          # Reusable button components
│       ├── Contact.tsx              # Contact information
│       ├── Fonts.tsx                # Font configurations
│       ├── FormatDates.tsx          # Date formatting utilities
│       ├── InputContentUtils.tsx    # Content input components
│       ├── InputNameUtils.tsx       # Name input validation
│       ├── RadioOptionsUtils.tsx    # Radio button components
│       ├── SelectUtils.tsx          # Select dropdown utilities
│       ├── Sidebar.tsx              # Navigation sidebar
│       ├── Switcher.tsx             # Theme switcher component
│       ├── TextAreaUtils.tsx        # Text area components
│       └── TTechLogo.tsx            # Logo component
├── public/                    # Static Assets (organized by feature)
│   ├── BTSLogoDoors/              # Homepage door animation assets
│   ├── Festa2025/                 # BTS Festa celebration images
│   ├── FishJin/                   # Jin fishing game assets
│   ├── HobiDischarge/             # J-Hope discharge celebration
│   ├── Hobipalooza/               # Concert experience assets
│   ├── Iconos/                    # Application icons
│   ├── Logos/                     # Feature logos and branding
│   ├── LoveNotes/                 # Valentine's themed assets
│   ├── Photobooth/                # Photo frame templates
│   ├── Polaroid/                  # Polaroid backgrounds
│   ├── RPS/                       # Rock Paper Scissors graphics
│   ├── Sugaverse/                 # Agust D themed assets
│   ├── Tetris/                    # Tetris game graphics
│   ├── Virthday/                  # V's birthday assets
│   └── VPassport/                 # Virtual passport stamps
├── tests/                     # Comprehensive Test Suites
│   ├── FormsTest/                 # Form component tests
│   ├── ModalTests/                # Modal component tests
│   ├── PageTest/                  # Page component tests
│   ├── ResultTest/                # Result component tests
│   └── UtilsTest/                 # Utility function tests
├── e2e/                       # End-to-End Tests
│   └── test-1.spec.ts             # Playwright E2E test specs
├── .github/workflows/         # GitHub Actions CI/CD
├── Configuration Files
│   ├── eslint.config.mjs          # ESLint configuration
│   ├── jest.config.ts             # Jest testing setup
│   ├── next.config.ts             # Next.js configuration
│   ├── playwright.config.ts       # E2E testing setup
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
``` 

Built with 💜 for the BTS ARMY community