export default class Character {
    image
    name
    maxKi
    race
    description
    id

    constructor(id, name, maxKi, race, description, image) {
        this.name = name
        this.image = image
        this.maxKi = maxKi
        this.race = race
        this.description = description
        this.id = id
    }

    getName() {
        return this.name
    }

    getImage() {
        return this.image
    }

    getKi() {
        return this.ki
    }

    getRace() {
        return this.race
    }

    getDescription() {
        return this.description
    }

    getId() {
        return this.id
    }
}