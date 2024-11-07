export default class Planets {
    image
    name
    id
    isDestroyed
    description

    constructor(id, name, isDestroyed, description, image) {
        this.name = name
        this.image = image
        this.id = id
        this.isDestroyed = isDestroyed
        this.description = description
    }

    getName() {
        return this.name
    }

    getImage() {
        return this.image
    }

    getIsDestroyed() {
        return this.isDestroyed
    }

    getId() {
        return this.id
    }

    getDescription() {
        return this.description
    }
}

