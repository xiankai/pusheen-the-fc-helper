# pusheen-the-fc-helper

Link to add it:
https://discordapp.com/oauth2/authorize?client_id=176621644582748160&scope=bot&permissions=3072

### Setup steps:
1. Repo (Taken from https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
  - `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
2. Packages
  - `sudo apt-get -y git redis-server libfontconfig nodejs`
3. Install (after navigating to appropriate parent directory)
  - `git clone https://github.com/xiankai/pusheen-the-fc-helper.git`
4. Install npm packages
  - `npm install`
5. Add credentials to `credentials.json` - see `credentials.json.sample` for an example.
  - `cp credentials.json.sample credentials.json`
6. Run crawler
  - `npm run crawl`

### Optional:
1. Clear out those annoying phantomjs warning messages (from https://github.com/ariya/phantomjs/issues/13433#issuecomment-130340836)
```
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
sudo dpkg-reconfigure locales
```

# User Guide
Only 2 main commands are available for the time being.
- **!linkshells**
  - Description: Shows a list of linkshells for a character. At the moment, only Jenova data is available. Case-sensitive.
  - Usage: `!linkshells <world> <character name>`
- **!airships**
  - Description: A simple timer to keep track of voyages
    - Register
      - Description: Registers an airship for tracking.
      - Usage: `!airships register <name>`
    - Launch
      - Description: Starts a voyage timer. Will send a message back when voyage is done.
      - Usage: `!airships launch <name> <time>`
      - Time: `2d3h4m | 20h20m | 5m`

# Roadmap
Released:
- Tracking airship voyage timers
- Linkshell lookup

Roadmap:
- Airship voyage tracker
  - List of airships
  - Recording yields, with texts (maybe screenshot who knows)
  - 
- FC website tracker
  - guildworks.com
  - Announce posts when possible
  - event schedule