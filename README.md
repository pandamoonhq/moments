# moments
This repo contains all the source code for the following 
- Wedding seat finder templates

# Wedding Configuration Setup

All wedding-specific settings are controlled from:

config/wedding.js

When creating a new wedding, update this file only.

The app code (`app.js`), layout (`index.html`) and styling (`style.css`) should not need to change.

---

# Configuration Guide

## 1. Google Sheets Connection

Each wedding uses its own Google Sheet and Google Apps Script connection.

Update:

    apiUrl:
    "https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec",

---

## 2. Wedding Details

Controls the couple information displayed on the page.

Update:

    coupleNames:
    "Amanda & Alex",

    coupleInitials:
    "A + A",

    weddingDate:
    "25 SEPTEMBER 2027",

    venue:
    "Your Venue",

Example:

    coupleNames:
    "Sarah & Tom",

    coupleInitials:
    "S + T",

    weddingDate:
    "12 APRIL 2028",

    venue:
    "The Garden Estate",

---

## 3. Page Title

Controls the browser tab title.

Update:

    pageTitle:
    "A & A | Find Your Table",

Example:

    pageTitle:
    "Sarah & Tom | Find Your Table",

---

## 4. Welcome Section

Controls the main welcome message.

Update:

    welcome: {

        title:
        "Welcome",

        subtitle:
        "Find your table for the celebration"

    },

Example:

    welcome: {

        title:
        "Welcome to our wedding",

        subtitle:
        "Find your seat and join the celebration"

    },

---

## 5. Guest Search Section

Controls the search instructions.

Update:

    search: {

        label:
        "ENTER YOUR NAME",

        placeholder:
        "Your name"

    },

Example:

    search: {

        label:
        "SEARCH YOUR NAME",

        placeholder:
        "Type your name"

    },

---

## 6. Button Text

Controls the search button wording.

Update:

    buttons: {

        searching:
        "FINDING YOUR TABLE...",

        default:
        "VIEW TABLE"

    },

---

## 7. Guest Messages

Controls messages shown to guests.

Update:

    messages: {

        emptyName:
        "Please enter your name",

        guestNotFound:
        "Guest not found. Please try again.",

        error:
        "Something went wrong. Please try again."

    },

---

## 8. Seating Result Labels

Controls wording displayed after a guest finds their table.

Update:

    labels: {

        yourTable:
        "YOUR TABLE",

        seatedWith:
        "SEATED WITH",

        familyFriends:
        "FAMILY & FRIENDS",

        otherTables:
        "Other tables",

        closing:
        "Enjoy the evening ✨"

    },

---

## 9. Feature Controls

Enable or disable optional features.

Update:

    features: {

        showSameTableGuests:
        true,

        showOtherTables:
        true,

        showVenueMap:
        false

    },

### Show guests seated at the same table

Enabled:

    showSameTableGuests:
    true

Disable:

    showSameTableGuests:
    false

---

### Show family and friends at other tables

Enabled:

    showOtherTables:
    true

Disable:

    showOtherTables:
    false

---

### Venue Map

Currently disabled:

    showVenueMap:
    false

---

## 10. Wedding Theme Colours

Controls the visual style of the wedding website.

Update:

    theme: {

        background:
        "#EEEAE3",

        text:
        "#33363A",

        mutedText:
        "#6F7478",

        lightText:
        "#9A9A9A",

        accent:
        "#8FAFC4",

        accentLight:
        "#E5EDF2",

        card:
        "#F7F4EF",

        border:
        "#D8D0C5"

    },

---

## Example Themes

Blue Editorial:

    accent:
    "#8FAFC4"

Garden Wedding:

    accent:
    "#9CAF88"

Champagne Luxury:

    accent:
    "#B89B72"

---

## 11. Fonts

Controls typography.

Update:

    fonts: {

        body:
        "'Montserrat', sans-serif",

        heading:
        "'Cormorant Garamond', serif",

        script:
        "'Parisienne', cursive"

    },

---

# New Wedding Setup Checklist

When creating a new wedding:

☐ Clone the repository

☐ Create a new Google Sheet guest list

☐ Create a new Google Apps Script deployment

☐ Update config/wedding.js

☐ Test guest autocomplete

☐ Test seating results

☐ Generate QR code

☐ Deploy website

---

# Files That Should Not Be Edited Per Wedding

The following files are the core seating finder engine:

app.js

style.css

index.html

These should remain unchanged between weddings.

Only update:

config/wedding.js

for each new wedding.

---

# Future Improvements

Possible future configuration options:

- Custom wedding logos
- Custom background images
- Different invitation themes
- Venue maps
- Multiple language support
- Custom QR code designs
- RSVP integration
