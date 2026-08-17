# Flea Market Monorepo

NestJS APIとReact SPAを同じリポジトリで管理する、pnpm workspaceベースのモノレポです。

## 必要な環境

- Node.js 20.19以上
- pnpm 10以上
- PostgreSQL（既存の商品・認証APIを起動する場合）

## セットアップ

```bash
pnpm install
```

## アプリケーション

| Workspace  | 技術            | 開発コマンド   | URL                     |
| ---------- | --------------- | -------------- | ----------------------- |
| `apps/api` | NestJS 11       | `pnpm dev:api` | `http://localhost:3000` |
| `apps/web` | React 19 + Vite | `pnpm dev:web` | `http://localhost:5173` |

WebからAPIへのアクセスを許可するオリジンは、APIの`WEB_ORIGIN`環境変数で変更できます。デフォルトは`http://localhost:5173`です。

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

既存APIはPostgreSQLを使用します。接続設定とマイグレーション設定は`apps/api/ormconfig.js`にあります。本番環境では、認証情報を環境変数または秘密情報管理サービスへ移してください。
