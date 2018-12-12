require 'sinatra'
require "sinatra/base"
require "sinatra/namespace"
require 'classifier-reborn'
require 'marky_markov'
require 'json'
require "sinatra/cors"
require 'sinatra/cross_origin'


class MyApp < Sinatra::Base
  register Sinatra::Cors
  register Sinatra::Namespace

  set :allow_origin, "http://localhost:9393 http://localhost:3000 "
  set :allow_methods, "GET,HEAD,POST"
  set :allow_headers, "content-type,if-modified-since"
  set :expose_headers, "location,link"
  set :bind, '0.0.0.0'

  namespace '/api/v1' do
    # Sets the content type as accepting only json
    before do
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      content_type 'application/json'
      philosopher = 'Lucretius'
      # Source Files for the text
      list_of_latin_texts = ["./training_text/lucretius_latin/lucretius_book_1.txt", "./training_text/lucretius_latin/lucretius_book_2.txt", "./training_text/lucretius_latin/lucretius_book_3.txt", "./training_text/lucretius_latin/lucretius_book_4.txt", "./training_text/lucretius_latin/lucretius_book_5.txt", "./training_text/lucretius_latin/lucretius_book_6.txt"]

      list_of_english_texts = ["./training_text/lucretius_english/lucretius_book_1.txt", "./training_text/lucretius_english/lucretius_book_2.txt", "./training_text/lucretius_english/lucretius_book_3.txt", "./training_text/lucretius_english/lucretius_book_4.txt", "./training_text/lucretius_english/lucretius_book_5.txt", "./training_text/lucretius_english/lucretius_book_6.txt"]
      # For loop to iterate through all the books
      latin_lucretius_markov = MarkyMarkov::Dictionary.new('latin_lucretius_markov')
      english_lucretius_markov = MarkyMarkov::Dictionary.new('english_lucretius_markov')

      (0..list_of_latin_texts.length).each do |i|
        latin_lucretius_markov.parse_file list_of_latin_texts[i]
        english_lucretius_markov.parse_file list_of_english_texts[i]
      end

      latin_lucretius_markov.save_dictionary!
      english_lucretius_markov.save_dictionary!
      @philosopher = philosopher
      @latin_lucretius_markov = latin_lucretius_markov
      @english_lucretius_markov = english_lucretius_markov
    end

    options "*" do
      response.headers["Allow"] = "HEAD,GET,PUT,DELETE,OPTIONS"
      # Needed for AngularJS
      200
    end

    get '/' do
      'Welcome to the Roman Philosophy Generator'
    end

    get '/generate-text/:language' do
      language = params['language']
      if language == 'Latin'
        lucretius_text_generated = @latin_lucretius_markov.generate_n_sentences 5
        # lucretius_text_generated = format_text(lucretius_text_generated)
        response = { :generated_text => lucretius_text_generated }.to_json
        response
      elsif language == 'English'
        lucretius_text_generated = @english_lucretius_markov.generate_n_sentences 5
        # lucretius_text_generated = format_text(lucretius_text_generated)
        response = { :generated_text => lucretius_text_generated }.to_json
        response
      else
        response = { :generated_text => "No language selected." }.to_json
        response
      end
    end

    options '/classify-text/' do
      begin
        data = File.read("classifier.dat")
        trained_classifier = Marshal.load data
        puts classified_text
        puts params
        classified_text = trained_classifier.classify params[:text] #=> 'Interesting'
        response = { :classified_text => classified_text }.to_json
        response
      rescue
        response = { :classified_text => "Incorrect " }.to_json
    end

  end
    # $0 is the executed file
    # __FILE__ is the current file
    run! if __FILE__ == $0
  end
end

# Sets the name space for our api so we can version control in the future
