# ServerGuardBot

**ServerGuardBot** is a Discord bot designed to verify that users are present on one or more required servers using OAuth2 authorization. It ensures users meet the necessary server membership requirements before granting access.

## Features

- **OAuth2 Integration:** Verifies user presence in required servers as configured.
- **Automated Access Management:** Grants server access upon successful OAuth2 authorization.

## Getting Started

### Prerequisites

- [Node.js (v16 or higher)](https://nodejs.org/fr)

### Creating Your Discord Bot

1. **Create a Discord Application:**
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Click on "New Application" and give it a name.
   - Go to the "Bot" tab and click "Add Bot." Confirm by clicking "Yes, do it!"

2. **Get Your Bot Token:**
   - Under the "Bot" tab, you will see a "Token" section. Click "Copy" to save your token. You'll need this for your `.env` file.

3. **Configure OAuth2 Settings:**
   - Go to the "OAuth2" tab in your application.
   - Under "OAuth2 URL Generator," select the scopes `identify` and `guilds`.
   - In the "OAuth2 Redirects" section, add the redirect URI where your bot will handle the OAuth2 response (e.g., `http://localhost:3000/callback`).

4. **Invite the Bot to Your Server:**
   - In the "OAuth2" tab, select the `bot` scope and choose the permissions your bot needs.
   - Copy the generated OAuth2 URL and paste it into your browser to invite the bot to your server.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/untanukii/serverguardbot.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd serverguardbot
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   A `.env.example` file is provided. Rename it to `.env` and update with your configuration:

   ```plaintext
    DISCORD_TOKEN="secret discord bot token"
    CLIENT_ID="your client id"
    CLIENT_SECRET="your client secret"
   ```

5. **Start the bot:**

   ```bash
   npm start
   ```

## Configuration

- **Update `config.js`:** Make sure to set the correct OAuth2 settings, including redirect URIs, scopes, and server addresses.
- **Redirect URI:** Ensure the redirect URI specified in the OAuth2 settings matches the one configured in your Discord Developer Portal.

## Usage

- **Authorize the Bot:** Use the OAuth2 URL to authorize the bot and ensure the user is a member of the required servers.
- **Interact with the Bot:** The bot will manage server access based on your configuration.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Support

If you find this project useful, please consider giving it a ⭐ on [GitHub](https://github.com/untanukii/serverguardbot). Your support helps keep the project active and encourages further development.

## Contact

For support or questions, please contact me on Discord @untanukii or [Twitter](https://twitter.com/untanukii).