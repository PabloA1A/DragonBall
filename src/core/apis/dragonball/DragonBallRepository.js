import Repository from "../../models/Repository.js";

export default class DragonBallRepository extends Repository {

    async getById(id) {
        try {
            const response = await fetch(this.uri + id)
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Error loading DragonBall API')
        }
    }
}