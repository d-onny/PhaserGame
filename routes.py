from flask import Flask, render_template
#from flask_bootstrap import Bootstrap

app = Flask(__name__)
#bootstrap = Bootstrap(app)

@app.route("/")
def home():
    return render_template('index3.html')


if __name__ == '__main__':
    app.run(debug=True)
