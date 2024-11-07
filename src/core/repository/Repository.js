export default class Repository {
  constructor(uri) {
    this.uri = uri
  }

  getUri() {
    return this.uri
  }

  async get(limit,page) {
    try {
      let uri = this.uri
      uri += `?limit=${limit}`
      if (page) uri += `&page=${page}`
      const response = await fetch(uri)
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error('Error loading API')
    }
  }
}
