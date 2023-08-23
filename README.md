# What is it?

iDoRecall is a spaced-repetition flashcard app that enables you to create **flashcards that we call RECALLS** that are linked to the exact location in your learning materials where you learned that thing. This linking makes it easy to refresh your memory in the context where something should you ever forget it.

The iDoRecall Obsidian plugin is a companion plugin for the iDoRecall web application. Use the plugin to create recalls that are linked to text in your Obsidian notes. When you practice memory retrieval with these recalls, if you struggle to recall the answer, just click the source button. Obsidian will immediately open the source note with the linked text highlighted.

## Installation
You can install this plugin from the community plugins section in Obsidian. Or install plugin from the [integrations page](https://app.idorecall.com/profile/integrations) within your iDoRecall application profile. Alternatively, you can download the latest release from Github and place the files it into your vault's plugins folder at: your-vault/.obsidian/plugins

## Requirements
In order to use the plugin, you need to create an account on iDoRecall or log in to your existing account. If you don't have an an iDoRecall account, [go create one](https://app.idorecall.com/auth/sign-up). It's completely free and enables you to have up to 200 recalls.

### Activation
To activate the plugin, you need to generate an API key so that the plugin will be linked to your account. To do this, follow these steps:

1. Log in to your iDoRecall account.
2. Navigate to the [Integrations section in your profile](https://app.idorecall.com/profile/integrations).
3. Find the Obsidian widget and click on "Click to generate key." Once generated, copy the API key.

![obsidian-integration idorecall com|200](https://github.com/iDoRecall/idr-obsidian-plugin/assets/1734740/6d91028f-1ced-4cdb-8d26-82b88713f9fe)


Then, you need to activate the plugin in Obsidian. To do this, follow these steps:

1. Open your Obsidian application.
2. Go to the Settings of your vault.
3. Toggle the switch next to the iDoRecall plugin to enable it.
4. Click on the "Options" icon.
5. Paste the API key you copied earlier into the appropriate field.

Now, your set to use the iDoRecall plugin within Obsidian.

Please note: If you have multiple accounts within the iDoRecall application and you want to use them with the plugin, you need to generate a separate API key for each of these accounts. The API key is used for synchronizing created flashcards (Recalls) between the plugin and the iDoRecall web application.

## Features

Create flashcards that we call RECALLS that are linkeed to text in your Obsidian notes. Actiivate the iDoRecall plugin inside any note by 
- clicking the iDoRecall plugin icon on the Obsidian ribbon <img width="64" alt="image" src="https://github.com/iDoRecall/idr-obsidian-plugin/assets/1734740/a58f079e-7551-4b30-b268-1ebc7d586df0">

- or by ZZZZZZZZ




Then select some text in your note that you want to linked to.

You can manually determine which field to send the content to. To do this, simply select the text and choose which field you'd like to send it to: Q (Question), A (Answer), or QA (Question and Answer).


We support various text editing tools, including formatting options such as text size, styles, and more.


You can create reversible recalls ** DAVID, PLEASE INSERT LINK ON THE VIDEO**


Additionally, you can add tags to your flashcards (recalls) for more precise thematic classification of the material.


Please note: that practicing the recalls you've created (using the spaced repetition algorithm) is only possible in the web version of the IDoRecall application.
For more detailed information about how the "Practice" mode works, you can refer to the provided link. DAVID, PLEASE INSERT THE LINK ON VIDEO

how does it work ?
To start using the plugin, simply highlight the text and determine which field you want to place it in: Question, Answer, or both (Question and Answer).

Then, fill in the empty field (in our example, Answer) and click the "ADD RECALL" button.

The recall you've created will be saved and accessible both within the plugin itself and in the IDoRecall application.

Now you have the opportunity to practice the recall you've created in the web application.


As we described earlier, API keys are used for synchronization between the web application and the plugin. To facilitate interaction, each recall created in Obsidian has a back link. Clicking on this link will allow you to return to Obsidian and view the section of text where the recall was created.


Please note: To enable the use of backlinks, we create a highlight ID next to each text block where a recall is created. Please do not delete this ID, as doing so will prevent you from being able to navigate to the created recall.

As mentioned earlier, you can use our tools to modify styles, sizes, and other parameters of the highlighted text.

You can also add tags to a recall during its creation process. You can select an existing tag that was created in IDoRecall or create a new one. Tags assist in categorizing the recalls you create.

The IDR plugin also allows you to edit previously created recalls. To do this, click on the "Edit" button on the recall card. You can edit all fields, add or replace text, and the recall will retain its highlight and position on the note.
To save the changes, you need to click the "Add Recall" button again.

To delete a recall, you need to click the "Delete" button on the recall form. This will remove the recall from both Obsidian and the IDoRecall web application. However, the text that was highlighted will not be deleted from your Obsidian note.


Have ideas/Requests/Bugs ?
If you have ideas, suggestions, or encountered any issues, please don't hesitate to contact us using the following method: DAVID, PLEASE INSERT LINK
