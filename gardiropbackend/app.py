from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from rembg import remove
import io

app = Flask(__name__)
CORS(app) # React Native'in bağlanabilmesi için bu şart

@app.route('/', methods=['GET'])
def check():
    return "Sunucu Hazır!"

@app.route('/remove-bg', methods=['POST'])
def remove_background():
    print("Gelen istek: Fotoğraf işleniyor...")
    try:
        if 'image' not in request.files:
            return jsonify({"error": "Resim dosyası gönderilmedi"}), 400
        
        file = request.files['image']
        input_image = file.read()
        
        # Arka planı silme işlemi
        output_image = remove(input_image)
        
        return send_file(
            io.BytesIO(output_image),
            mimetype='image/png',
        )
    except Exception as e:
        print(f"Hata: {e}")
        return str(e), 500

if __name__ == '__main__':
    # host='0.0.0.0' simülatörün Mac'teki sunucuyu görmesini sağlar
    app.run(host='0.0.0.0', port=5005, debug=True)