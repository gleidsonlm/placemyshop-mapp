# Contributing to placemyshop-mapp

First off, thank you for considering contributing to `placemyshop-mapp`! We welcome any help, from reporting bugs and suggesting features to writing code and improving documentation. Every contribution is valuable.

This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please make sure you are familiar with its contents.

## How Can I Contribute?

There are many ways to contribute:

*   **Reporting Bugs:** If you find a bug, please open an issue in our issue tracker. Include as much detail as possible: steps to reproduce, expected outcome, actual outcome, and your environment.
*   **Suggesting Enhancements:** If you have an idea for a new feature or an improvement to an existing one, please open an issue to discuss it. This allows us to coordinate efforts and ensure the suggestion aligns with the project's goals.
*   **Pull Requests:** If you want to contribute code or documentation:
    1.  Fork the repository.
    2.  Create a new branch for your changes (`git checkout -b feature/your-feature-name` or `bugfix/issue-number`).
    3.  Make your changes. Ensure you follow the coding style and add/update tests where appropriate.
    4.  Commit your changes with clear and descriptive commit messages.
    5.  Push your branch to your fork (`git push origin feature/your-feature-name`).
    6.  Open a pull request against our `main` branch. Provide a clear description of your changes and link any relevant issues.

## Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [TODO: Repository URL] # Replace with actual URL when available
    cd placemyshop
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Run the development server:**
    ```bash
    npx expo start
    ```
    This will open the Metro Bundler in your browser. You can then:
    - Scan the QR code with the Expo Go app on your iOS or Android device.
    - Press `a` to run on an Android emulator or connected device.
    - Press `i` to run on an iOS simulator or connected device (macOS only).
    - Press `w` to run in your web browser.

## Coding Style

*   We use **Prettier** for automatic code formatting. Please ensure it's run before committing changes. Configuration is in `.prettierrc` (or will be).
*   Follow standard **TypeScript** best practices.
*   Adhere to **React** best practices (e.g., rules of hooks).
*   Write clear, understandable, and maintainable code.
*   Comment your code where necessary, especially in complex or non-obvious parts.
*   Ensure your code is well-tested.

## Testing

*   We use **Jest** for unit and integration testing.
*   Test files are typically located alongside the modules they test (e.g., `MyComponent.spec.tsx`) or in a `__tests__` directory.
*   All new features should include unit tests.
*   Bug fixes should ideally include a test that reproduces the bug and verifies the fix.
*   Ensure all tests pass before submitting a pull request.
*   Run tests using:
    ```bash
    npm test
    # or
    # yarn test
    ```

## Pull Request Process

1.  Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2.  Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3.  Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4.  You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Issue and Branch Naming Conventions

*   **Issues:** Use descriptive titles. Prefix with `Bug:`, `Feature:`, `Docs:`, `Chore:`, etc.
*   **Branches:**
    *   `feature/descriptive-name` (e.g., `feature/add-product-recommendation-engine`)
    *   `bugfix/issue-number-descriptive-name` (e.g., `bugfix/123-fix-layout-rendering-glitch`)
    *   `docs/update-readme`
    *   `chore/setup-ci`

## Questions?

If you have any questions, feel free to ask by opening an issue.

Thank you for contributing!
