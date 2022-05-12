
### Built With

* JavaScript
* [csv-load-sync](https://www.npmjs.com/package/csv-load-sync)
* [Moment.js](https://momentjs.com/)
* [CSV writer](https://www.npmjs.com/package/csv-writer)


<!-- GETTING STARTED -->
## Getting Started


### Prerequisites
Make sure you have Node installed - [Follow this Guide](https://heynode.com/tutorial/install-nodejs-locally-nvm/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dmccoy1/crypto-parser.git
   ```
2. Inside the cloned repo - Install NPM packages
   ```sh
   npm install
   ```
3. Run App
   ```sh
   node etl.js path/to/file.csv
   ```
   Note the Application would only execute if the imported csv has the required headers [example-csv](https://github.com/dmccoy1/crypto-parser/blob/main/coin_Bitcoin.csv):
   
| Sno | Name | Symbol | Date | High | Low | Open | Close | Volume | Marketcap |
|-----|------|--------|------|------|-----|------|-------|--------|-----------|



