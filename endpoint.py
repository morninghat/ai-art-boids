from flask import Flask, render_template

app = Flask(__name__)

messages = [{'points': [[269,350],[269,300],[300,350],[300,300]]}]

@app.route('/pose')
def pose():
    return messages

@app.route('/ui')
def index():
    return render_template('index.html')

if __name__=="__main__":
    print("START RUN");
    app.run(debug=True, port = 5008, host = "0.0.0.0")
    print("END RUN");

