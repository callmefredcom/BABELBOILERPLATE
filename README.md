# Instructions to use Flask Babel 

https://python-babel.github.io/flask-babel/

### Install Flask Babel

```
pip install Flask-Babel
```

### Directories

Create **/translations** directory at the root of the project

Create **/lg** directory for each supported language (e.g. /en, /fr,…)

Create **/LC_MESSAGES** folder under each supported language

### add & configure babel.cfg file at the root of the project

```
[jinja2: templates/**.html]
[python: **.py]
```

### Extract text strings from our HTML templates and .py files

```
pybabel extract -F babel.cfg -o messages.pot .
```
It creates a messages.pot file

### Then initialize language translation files, it will create a .po file, here for French (fr)

```
pybabel init -i messages.pot -d translations -l fr
```

Note: if you want to later update the .po file after creating a new messages.pot file

```
pybabel update -d translations -i messages.pot -l fr

```

### Translate the strings

Then translate all the **msgid** entries in the .po file as **msgstr**

You can give the full content to ChatGPT and ask it to generate the translations. 

### Finally, compile the .po file to a .mo file 

```
pybabel compile -d translations
```

### Don't forget to import babel as shown in our boilerplate

```
from flask_babel import Babel, _,lazy_gettext as _l, gettext
```

Follow the instructions for the full configuration.
