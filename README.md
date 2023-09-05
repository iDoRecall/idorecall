# What is it?

iDoRecall is a spaced-repetition flashcard app that enables you to create **flashcards that we call RECALLS**.
> __Recalls are linked to the exact location in your learning materials where you learned that thing. This linking makes
it easy to refresh your memory in the context where something should you ever forget it.__

The iDoRecall Obsidian plugin is a companion plugin for the iDoRecall web application. Use the plugin to create recalls
that are linked to text in your Obsidian notes. When you practice memory retrieval with these recalls, if you struggle
to recall the answer, just click the source button. Obsidian will immediately open and the source note will be displayed
with the linked text highlighted.

## Installation

You can install this plugin from the community plugins section in Obsidian. Or install plugin from
the [integrations page](https://app.idorecall.com/profile/integrations) within your iDoRecall application profile.
Alternatively, you can download the latest release from Github and place the files it into your vault's plugins folder
at: your-vault/.obsidian/plugins

## Requirements

In order to use the plugin, you need to create an account on iDoRecall or log in to your existing account. If you don't
have an an iDoRecall account, [go create one](https://app.idorecall.com/auth/sign-up). It's completely free and enables
you to have up to 200 recalls.

## Activation

To activate the plugin, you need to generate an API key so that the plugin will be linked to your account. To do this,
follow these steps:

1. Log in to your iDoRecall account.
2. Navigate to the [Integrations section in your profile](https://app.idorecall.com/profile/integrations).
3. Find the Obsidian widget and click on "Click to generate key." Once generated, copy the API key.

https://github.com/iDoRecall/idorecall/assets/1734740/3c6971ab-27bc-4251-98f8-e1eba6980ace

Then, you need to activate the plugin in Obsidian. To do this, follow these steps:

1. Open your Obsidian application.
2. Go to the Settings of your vault.
3. Toggle the switch next to the iDoRecall plugin to enable it.
4. Click on the "Options" icon.
5. Paste the API key you copied earlier into the appropriate field.

Now, your set to use the iDoRecall plugin within Obsidian.

Please note: If you have multiple iDoRecall accounts, and you want to use them with the plugin in all of those accounts,
you need to generate a separate API key for each of these accounts. The API key is used for synchronizing created
flashcards (Recalls) between the plugin and the iDoRecall web application.

## Features

Create flashcards that we call RECALLS which are linked to text in your Obsidian notes. Activate the iDoRecall plugin
inside any note by

- clicking the iDoRecall plugin icon on the Obsidian
  ribbon <img width="35" alt="image" src="https://github.com/iDoRecall/idorecall/assets/1734740/d2980c14-d9e1-4359-ad51-eea479610e15">


- or by using the Obsidian command palette and your chosen hotkeys.
<img width="704" alt="image" src="https://github.com/iDoRecall/idorecall/assets/1734740/3adb7a94-05ad-49ba-ad19-827fb5a6dc3d">



Once the plugin is activated, you can select some text in your note that you want to create a linked recall. A small
popup will appear.
<img width="152" alt="image" src="https://github.com/iDoRecall/idorecall/assets/1734740/acff6468-6995-450f-9e28-befc06bd3295">

## NOTE: You must be in editing mode in your Obsidian note in order to select text. <img width="192" alt="image" src="https://github.com/iDoRecall/idorecall/assets/1734740/05357ba9-85bd-4542-9fbf-c6fc65a9f2b9">


Click the popup to determine which field to send the selected to:  QA (Question and Answer), Q (Question), A (Answer).
In the example above, I clicked QA and the selected text was pasted into both the question and answer fields of the
recall creation form.
<img width="480" alt="image" src="https://github.com/iDoRecall/idorecall/assets/1734740/2cf7b886-7cc4-44ba-876a-1b40aac0322a">


Within the Q and A fields in the recall creation form, we support various text editing tools, including formatting
options such as text size, styles, and more. Feel free edit and even completely replace the text in these fields.
Regardless of any changes you make, the recall will be linked to the Obsidian block that contains the text that you
selected.

Other options during recall creation include adding tags and making the recall reversible. Reversible recalls are
sometimes shown to you where you are presented the contents in the A field and have to recall the contents in the Q
field.

After you have made all of your changes, click the "ADD RECALL" button. The recall you've created will be saved and
accessible both within the plugin itself and in the iDoRecall application. Now you have the opportunity to practice the
recall you've created in the web application.

Please note: To enable the use of source links, we create a highlight ID next to each text block where a recall is
created. Please do not delete this ID, as doing so will prevent you from being able to navigate to the created recall.

The iDoRecall plugin also allows you to edit previously created recalls. To do this, click on the "Editing" button on the
recall card. You can edit all fields, add or replace text, and the recall will retain its highlight and position on the
note.
<img width="427" alt="image" src="https://github.com/iDoRecall/idorecall/assets/1734740/132c1ad2-afa3-4054-80ef-1fc9176b5565">

To delete a recall, you need to click the "Delete" button on the recall form. This will remove the recall from both
Obsidian and the iDoRecall web application. However, the text that was highlighted will not be deleted from your
Obsidian note.

## Known issues

- You can't created recalls linked to text on Obsidian canvases or text in files on a canvas. You must open up those
  files if you want to create linked recalls.
- You can't created recalls linked to text on Excalidraw canvases or text in files on a canvas. You must open up those
  files if you want to create linked recalls.
- Obsidian source links only work on desktop computers.

Have ideas/Requests/Bugs?
If you have ideas, suggestions, or encounter any issues, please don't hesitate to contact us. Write to
david@idorecall.com.
