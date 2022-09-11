from flask import Flask, render_template

app = Flask(__name__)

messages = [{'title': 'Message One',
             'content': 'Message One Content'},
            {'title': 'Message Two',
             'content': 'Message Two Content'}
            ]

@app.route('/pose')
def pose():
    return messages

@app.route('/ui')
def index():
    return render_template('index.html')

if __name__=="__main__":
    app.run(debug=True, port = 5008, host = "0.0.0.0")

