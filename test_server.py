from flask import Flask, request, jsonify

app = Flask(__name__)

# 定义路由和处理函数以接收下载信息
@app.route('/download', methods=['POST'])
def download():
    if request.is_json:
        content = request.get_json()
        print("Received data from client:")
        print(content)  # 打印接收到的数据到控制台
        return jsonify({"status": "success", "message": "Data received"}), 200
    else:
        return jsonify({"status": "error", "message": "Request must be JSON"}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=10389)