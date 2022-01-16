<h1 align="center">Wordable</h1>

🤖 Wordable is a small, robust Discord bot to support and manage a daily word game in your server!

## Commands

- `/ping` - Replies with pong!
- `/guess {guess}` - Make a guess

## Contributing

I'm hopeful that these instructions are clear enough for you to clone everything and be able to contribute!

You'll need a couple of things: [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/en/download/).

Once you've got those, you'll want to open a Git Bash terminal somewhere, and run this:
```
git clone https://github.com/vtrodd/wordable
```

You'll next want to change directory to the newly created `wordable` folder from within that Git Bash terminal, using:
```
cd wordable
```
If you're working on a specific issue, you'll want to switch to a new branch with the relevant name, which you can do in the Git Bash terminal:
```
git checkout -b WI-XXX
```
And from there, still in that Git Bash window:
```
npm install
```
This will install the necessary node modules (don't worry, these won't be tracked and added to any commits you make!).

If you want to be able to run this bot, you'll also need a `config.json` file in the directory, something like this:
```
{
  "TOKEN": "THIS IS YOUR BOT'S TOKEN (don't share this)",
  "CLIENT_ID": "THIS IS THE ID OF YOUR BOT"
}
```

Once you've got that config file, you should be able to start up the bot with this line in a terminal:
```
ts-node .
```