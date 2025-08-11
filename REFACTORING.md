# Memoria y Niebla - Character Creator (Refactored)

This is a refactored version of the character creator following React best practices with a modular architecture.

## 📁 Project Structure

```
src/
├── types/                    # TypeScript type definitions
│   └── Character.ts         # Character, Action, and game types
├── constants/               # Game data and default values
│   ├── gameData.ts         # Attribute sets, package sets, difficulty options
│   ├── defaultCharacter.ts # Default character template
│   └── index.ts           # Barrel export
├── utils/                   # Utility functions
│   ├── gameUtils.ts        # Game-related utilities (formatting, dice, etc.)
│   ├── localStorage.ts     # Local storage management
│   ├── pdfExport.ts       # PDF export functionality
│   └── index.ts           # Barrel export
├── reducers/                # State management
│   └── characterReducer.ts # Character state reducer
├── hooks/                   # Custom React hooks
│   ├── useAutoSave.ts      # Auto-save functionality
│   ├── useDiceLog.ts       # Dice roll logging
│   └── index.ts           # Barrel export
├── components/              # React components
│   ├── character/          # Character-related components
│   │   ├── CharacterForm.tsx       # Main character form
│   │   ├── CharacterSheet.tsx      # Character sheet for display/print
│   │   ├── CharacterStepper.tsx    # Step navigation
│   │   ├── WelcomeScreen.tsx       # Welcome/onboarding screen
│   │   └── steps/                  # Individual form steps
│   │       ├── Step1BasicInfo.tsx
│   │       ├── Step2Attributes.tsx
│   │       ├── Step3Packages.tsx
│   │       ├── Step4Virtues.tsx
│   │       └── Step5Preview.tsx
│   ├── sidebar/            # Sidebar components
│   │   ├── Sidebar.tsx             # Main sidebar container
│   │   ├── DiceRoller.tsx          # Dice rolling interface
│   │   ├── DiceLog.tsx             # Roll history
│   │   ├── AdventurePoints.tsx     # Points management
│   │   └── QuickRules.tsx          # Rules reference
│   ├── ui/                 # Reusable UI components
│   │   ├── BasicComponents.tsx     # Section, Divider, StepHeader
│   │   ├── FormComponents.tsx      # SetSelector, ValueSelect
│   │   ├── PackageControl.tsx      # Adventure points control
│   │   ├── StepNavigation.tsx      # Step navigation buttons
│   │   └── Toast.tsx              # Toast notifications
│   ├── layout/             # Layout components
│   │   └── Header.tsx              # App header with navigation
│   └── index.ts           # Barrel export
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## 🏗️ Architecture Principles

### 1. **Single Responsibility Principle**

Each component and module has a single, well-defined purpose:

- `CharacterForm` manages the multi-step form flow
- `DiceRoller` handles dice rolling logic
- `CharacterReducer` manages character state transitions

### 2. **Separation of Concerns**

- **UI Components**: Pure presentation components in `components/ui/`
- **Business Logic**: Game rules and calculations in `utils/gameUtils.ts`
- **State Management**: Centralized in `reducers/characterReducer.ts`
- **Side Effects**: Handled by custom hooks in `hooks/`

### 3. **Modularity & Reusability**

- Components are small, focused, and reusable
- Common UI patterns extracted into shared components
- Barrel exports (`index.ts`) for clean imports

### 4. **Type Safety**

- Comprehensive TypeScript types in `types/Character.ts`
- Strict typing throughout the application
- Type-safe component props and state management

### 5. **Performance Considerations**

- `useMemo` for expensive calculations
- Proper dependency arrays in `useEffect`
- Component splitting to avoid unnecessary re-renders

## 🔧 Key Improvements

### Before (Monolithic)

- Single 1500+ line file
- Mixed concerns (UI, logic, state)
- Difficult to maintain and test
- Poor reusability

### After (Modular)

- 30+ focused, small files
- Clear separation of concerns
- Easy to test individual components
- Highly reusable components
- Better developer experience

## 🚀 Benefits

1. **Maintainability**: Easy to locate and modify specific functionality
2. **Testability**: Each component can be tested in isolation
3. **Reusability**: Components can be reused across the application
4. **Scalability**: Easy to add new features without affecting existing code
5. **Developer Experience**: Clear structure, better IntelliSense, easier debugging
6. **Team Collaboration**: Multiple developers can work on different parts simultaneously

## 📝 Usage

The refactored application maintains the same functionality as the original while providing a much better developer experience. The main App component now orchestrates smaller, focused components rather than handling everything itself.

### Adding New Features

1. **New Step**: Add a new component in `components/character/steps/`
2. **New Sidebar Panel**: Add to `components/sidebar/`
3. **New UI Component**: Add to `components/ui/`
4. **New Game Rule**: Add to `utils/gameUtils.ts`
5. **New Character Property**: Update `types/Character.ts` and reducer

### Testing Strategy

With this modular structure, you can now:

- Unit test individual components
- Test business logic separately from UI
- Mock dependencies easily
- Write integration tests for component interactions

## 🔄 Migration Notes

The refactoring maintains 100% backward compatibility:

- All existing functionality preserved
- Same user interface and experience
- Same local storage format
- Same URL sharing format

This refactoring provides a solid foundation for future development and maintenance of the character creator application.
