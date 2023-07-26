import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import Migrator from "ts-migrate-mongoose";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "../config";

@Injectable()
export class DatabaseService {
  private migrator: Migrator = null;
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private configService: ConfigService<EnvironmentVariables>
  ) {}

  getConnection(): Connection {
    return this.connection;
  }

  async getMigrator(): Promise<Migrator> {
    if (!this.migrator) {
      this.migrator = await Migrator.connect({
        // This is the only required property you need to set
        // MongoDB connection string URI
        uri: this.configService.get("DATABASE_URL"),
        // All the options below are optional
        // Collection name to use for migrations (defaults to 'migrations')
        // Path to migrations directory, default is ./migrations
        migrationsPath: this.configService.get("MIGRATE_MIGRATIONS_PATH"),
        // The template to use when creating migrations needs up and down functions exposed
        // No need to specify unless you want to use a custom template
        templatePath: this.configService.get("MIGRATE_TEMPLATE_PATH"),
        // Ff making a CLI app, set this to false to prompt the user, otherwise true
        autosync: true
      });
    }

    return this.migrator;
  }

  async migrateUp() {
    const migrator = await this.getMigrator();
    const document = await migrator.run("up");
    console.log(`Migrations applied successfully (up). ${document.length} documents updated. `);
  }
}
