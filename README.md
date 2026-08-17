# Flea Market Monorepo

NestJS APIとReact SPAを同じリポジトリで管理する、pnpm workspaceベースのモノレポです。

## 必要な環境

- Docker Engine / Docker Compose（推奨）
- Node.js 20.19以上、pnpm 10以上（Dockerを使わず実行する場合）

## セットアップ

```bash
pnpm install
```

## Docker Composeで起動する

NestJS API、PostgreSQL、Redisをまとめて起動できます。

```bash
cp .env.example .env
docker compose up --build
```

PostgreSQLとRedisのヘルスチェックが成功してからAPIが起動します。起動後は次のURL・ポートを利用できます。

| サービス   | 接続先                            |
| ---------- | --------------------------------- |
| NestJS API | `http://localhost:3000`           |
| PostgreSQL | `localhost:5432`（DB名: `todos`） |
| Redis      | `redis://localhost:6379`          |

APIコンテナはソースをバインドマウントし、NestJSのwatchモードで動作します。停止する場合は`docker compose down`、データボリュームも削除して初期化する場合は`docker compose down --volumes`を実行してください。

ポートや開発用DB認証情報は`.env`で上書きできます。利用可能な変数は`.env.example`を参照してください。`.env`はGit管理対象外です。

## アプリケーション

| Workspace  | 技術            | 開発コマンド   | URL                     |
| ---------- | --------------- | -------------- | ----------------------- |
| `apps/api` | NestJS 11       | `pnpm dev:api` | `http://localhost:3000` |
| `apps/web` | React 19 + Vite | `pnpm dev:web` | `http://localhost:5173` |

WebからAPIへのアクセスを許可するオリジンは、APIの`WEB_ORIGIN`環境変数で変更できます。デフォルトは`http://localhost:5173`です。APIは`POSTGRES_*`環境変数でPostgreSQLへ接続し、`REDIS_HOST`と`REDIS_PORT`でRedisへ接続します。

## ディレクトリ構成

```text
apps/
├── api/
│   └── src/
│       ├── domain/          # エンティティ、値オブジェクト、ドメインサービス
│       ├── application/     # ユースケース、ポート
│       ├── infrastructure/  # DB、外部サービスなどのアダプター
│       ├── presentation/    # HTTPなどの入力インターフェース
│       └── shared/          # 層をまたぐ最小限の共通要素
└── web/
    └── src/
        ├── app/             # アプリ初期化とグローバル設定
        ├── pages/           # ルート単位の画面
        ├── features/        # ユースケース単位のUIとロジック
        ├── entities/        # フロントエンドのドメイン表現
        └── shared/          # 共通UI、APIクライアント、ユーティリティ
packages/                    # 将来の共有パッケージ
```

APIはクリーンアーキテクチャの依存性の原則に従い、外側の`presentation`と`infrastructure`から`application`、さらに`domain`へ依存させます。`domain`から外側の層へは依存させません。空の層は、実際のユースケースが生まれるまで不要な抽象化を追加しません。

## 品質チェック

```bash
pnpm test          # APIとWebの単体テスト
pnpm test:e2e      # APIのE2Eテスト
pnpm lint          # 全workspaceのESLint
pnpm typecheck     # TypeScript型チェック
pnpm build         # 全アプリのプロダクションビルド
pnpm format:check  # Prettierの確認
```

## TypeORM

既存APIはPostgreSQLを使用します。アプリケーションの接続設定は`apps/api/src/infrastructure/config/database.config.ts`、CLI向けのマイグレーション設定は`apps/api/ormconfig.js`にあり、どちらも環境変数から接続情報を取得します。Redisクライアントは`apps/api/src/infrastructure/redis`で管理し、NestJSの起動・停止に合わせて接続・切断します。本番環境では、認証情報を秘密情報管理サービスから環境変数へ渡してください。
