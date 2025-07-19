import express from "express";
import { AppDataSource } from "../data-source";
import { Word } from "../entity/Word";

export const router = express.Router();

const wordRepository = AppDataSource.getRepository(Word);

router.get("/", async (req, res) => {
    try {
        const words = await wordRepository.find({
            order: { added_at: "DESC" }
        });
        res.json(words);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du chargement des mots" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { translation, vn } = req.body;

        const newWord = wordRepository.create({
            translation,
            vn,
            added_at: new Date().toISOString()
        });

        await wordRepository.save(newWord);

        res.json(newWord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'ajout du mot" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { translation, vn } = req.body;

        const word = await wordRepository.findOneBy({ id: Number(id) });
        if (!word) {
            return res.status(404).json({ error: "Mot non trouvé" });
        }

        word.translation = translation;
        word.vn = vn;

        await wordRepository.save(word);

        res.json(word);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du mot" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const word = await wordRepository.findOneBy({ id: Number(id) });
        if (!word) {
            return res.status(404).json({ error: "Mot non trouvé" });
        }

        await wordRepository.remove(word);

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression du mot" });
    }
});
