class GoogleBooksApi {
  constructor (options) {
    this.defaults = {
      'apiUrl': 'https://www.googleapis.com/books/v1',
      'apiKey': 'AIzaSyDmbXk-aptT2LrpnW5cHzgYnT7noS7IjeQ'
    }
    this.elements = {
      'form': $('#form'),
      'input': $('#search-input')
    }
    this.options = Object.assign(this.defaults, options)
    this.registerEvents()
  }

  callApi (query, callback) {
    const url = `${this.options.apiUrl}/volumes`
    const params = {
      'q': query
    }

    $.getJSON(url, params)
      .done((data) => {
        console.log(data)
        this.showResults(data)
        callback(data)
      })
      .fail((response) => {
        callback(null)
      })
  }

  registerEvents () {
    this.elements.form.on('submit', (e) => {
      e.preventDefault()
      this.callApi(
        this.elements.input.val().trim(),
        (data) => {
          console.log(data)
        }
      )
    })
  }

  showResults (data) {
    data.items.forEach((item) => {
      this.elements.form.after(`
             <div class="card">
                 <img class="card-img-left" src='${item.volumeInfo.imageLinks.thumbnail}' alt="Card image cap">
                <div class="card-body">
                  <h3 class="card-title">'${item.volumeInfo.title}'</h3>
                  <h4 class="card-title">'${item.volumeInfo.authors}'</h4>
                  <p class="card-text">'${item.volumeInfo.description}'</p>
               </div>
            </div>
        `)
    })
  }

  bookViewer ()

}

const bookSearch = new GoogleBooksApi({})
