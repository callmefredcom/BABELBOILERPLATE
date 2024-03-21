from flask import Flask, render_template, request, jsonify, session, redirect, g
from flask_babel import Babel, _,lazy_gettext as _l, gettext

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
babel = Babel(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = './translations'


@app.route('/is_logged_in', methods=['GET'])
def is_logged_in():
# this is the return statement that should be used in production
#    return jsonify(is_logged_in=current_user.is_authenticated)
# demo return statement
    return jsonify(is_logged_in=False)

def get_locale():
    # Check if the language query parameter is set and valid
    if 'lang' in request.args:
        lang = request.args.get('lang')
        if lang in ['en', 'fr']:
            session['lang'] = lang
            return session['lang']
    # If not set via query, check if we have it stored in the session
    elif 'lang' in session:
        return session.get('lang')
    # Otherwise, use the browser's preferred language
    return request.accept_languages.best_match(['en', 'fr'])

def get_timezone():
    user = getattr(g, 'user', None)
    if user is not None:
        return user.timezone

babel = Babel(app, locale_selector=get_locale, timezone_selector=get_timezone)


@app.route('/setlang')
def setlang():
    lang = request.args.get('lang', 'en')
    session['lang'] = lang
    return redirect(request.referrer)

@app.context_processor
def inject_babel():
    return dict(_=gettext)

@app.context_processor
def inject_locale():
    # This makes the function available directly, allowing you to call it in the template
    return {'get_locale': get_locale}

@app.route('/')
def home():
    return render_template('index.html', current_locale=get_locale())

0
@app.route('/js_translations')
def js_translations():
    translations = {
        'logoutText': gettext('Logout'),
        'accountText': gettext('Account'),
        'successTitle': gettext('Success!'),
        'successText': gettext('You are registered.'),
        'validEmail': gettext('Please enter a valid email address.')
    }
    return jsonify(translations)


@app.route('/email_signup', methods=['POST'])
def email_signup():
    email = request.json['email']
    print(email)
    return jsonify(success=True)


if __name__ == '__main__':
    app.run(debug=True)