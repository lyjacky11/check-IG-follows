# Check IG Follows
Check the number of followers and followings on a Instagram account. Also calculates the number of users you are not following and users that are not following you.

## Requirements

- The Tampermonkey extension is required to use this script.
- The script must be ran on `https://www.instagram.com/{username}` URLs.

[Download Tampermonkey](https://www.tampermonkey.net/)

## Changelog

- Version 2 automatically parses the array data into JSON
- Colourful console logs

## Usage

1. Create a new userscript in the Tampermonkey extension.

2. Copy & paste the code from the `.js` file into the code box and save changes.

3. Browse to [Instagram](https://www.instagram.com/) and view a user profile.

4. The URL in the address bar should be: `https://www.instagram.com/{username}`.

5. Open the browser console (`Ctrl+Shift+J` on Chrome).

6. You should see the script running in the console.

- If it's not running, ensure that the script is turned on in Tampermonkey, refresh the page and try again.

**NOTE: The page must be refreshed manually (`Ctrl+F5`) every time you want to fetch data.**

## Save Usernames

1. Expand the arrays of the data that you want to keep until you see the usernames in the console.

- In version 2 of the script, you should see JSON data in the console; click `Show more` under each set of JSON data to view the full list.

2. In the console log box, right click until you see a `Save as` option, and then save the log to your computer.

3. Clean up the log file by deleting all the lines that do not start with `userscript.html`.

4. Once all the lines start with `userscript.html`, start deleting the content until you have only the information you want to keep.

## Parse JSON to CSV/Excel

1. Use an online [JSON Formatter](https://jsonformatter.curiousconcept.com/) to format the single line JSONs into a readable format.

2. Save the separate JSON data into individual JSON files.

**NOTE: Step 3 applies only to version 1 of the script!**

3. Use Notepad++ `Find & Replace` feature to get the correct JSON syntax:

- Add a `,` and a new line to each `}` by finding `}` and replacing it with `},\n` using the `Extended` search mode.
- Add a set of `{` `}` braces as the root JSON element at the top and bottom of the file.
- Add a JSON property called `users:` under the root element and then a set of `[` `]` braces around the main content.
- Remove the extra text at intervals of 100 users (ex. 100th username, 200th username, etc.).
- Remove the numbers by finding `^\d+[:]` and replacing it with a blank string using the `Regular expression` search mode.
- Optional: Tab the JSON file until it has the correct indentation.

4. Validate the JSON files using the online [JSON Formatter](https://jsonformatter.curiousconcept.com/).

5. Use an online [JSON to CSV Converter](https://json-csv.com) and convert the files to CSV or Excel format.

6. Optional: Merge the separate Excel files into one spreadsheet and format the spreadsheet (sorting, styling, etc.) into a user friendly format.
