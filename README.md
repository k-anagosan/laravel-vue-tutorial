# Laravel-Vue-Docker

Laravel と Vue の開発環境を Docker で構築したリポジトリになります。

## 前提

- git
- docker
- docker-compose

```sh
git --version
git version 2.25.1
docker --version
Docker version 20.10.2, build 2291f61
docker-compose --version
docker-compose version 1.27.4, build 40524192
```

## 構築される環境

- PHP 7.4.14
- Composer 2.0.8
- Laravel 6.20.14
- Laravel/ui 1.3.0
- Nginx 1.18.0
- Node 14.15.4
- npm 6.14.10
- vue 2.6.12
- mysql 8.0.23

## 使用方法

1. 以下のコマンドを実行しコンテナを構築。app には任意の名前を設定可能。

```sh
git clone https://github.com/k-shishido/laravel-vue-docker.git app
cd app
docker-compose up -d --build
```

2. app コンテナに入る。

```sh
docker-copmose exec app bash
```

3. Laravel 含む composer のパッケージをインストール。

```sh
composer install
```

4. .env ファイルを.env.example から作成

```sh
cp .env.example .env
```

5. .env の APP_KEY を生成

```sh
php artisan key:generate
```

6. web コンテナ内で vue 含む npm パッケージをインストール。

```sh
docker-compose exec web sh
cd /var/www/html/laravel
npm install
```
