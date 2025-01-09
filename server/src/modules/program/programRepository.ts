import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
}

class ProgramRepository {
  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer tous les programmes de la table "program"
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM program");

    // Retourne le tableau des programmes
    return rows as Program[];
  }

  async read(id: number) {
    // Exécute la requête SQL SELECT pour récupérer un programme spécifique par son ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM program WHERE id = ?",
      [id],
    );

    // Retourne la première ligne du résultat, qui représente le programme
    return rows[0] as Program;
  }

  async update(program: Program) {
    // Exécute la requête SQL UPDATE pour mettre à jour un programme existant dans la table "program"
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET title = ?, synopsis = ?, poster = ?, country = ?, year = ?, category_id = ? WHERE id = ?",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        program.category_id,
        program.id,
      ],
    );

    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }

  async create(program: Omit<Program, "id">) {
    // Exécute la requête SQL INSERT pour ajouter un nouveau programme dans la table "program"
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO program (title, synopsis, poster, country, year, category_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        program.title,
        program.synopsis,
        program.poster || "", // Si `poster` est optionnel, on peut passer une chaîne vide
        program.country,
        program.year,
        program.category_id,
      ],
    );

    // Retourne l'ID du nouvel élément inséré
    return result.insertId;
  }
  async delete(id: number) {
    // Execute the SQL DELETE query to delete an existing category from the "category" table
    const [result] = await databaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

export default new ProgramRepository();
