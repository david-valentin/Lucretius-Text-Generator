require 'classifier-reborn'

def build_train_classifier
  books = ['lucretius_book_1.txt', 'lucretius_book_2.txt', 'lucretius_book_3.txt', 'lucretius_book_4.txt', 'lucretius_book_5.txt', 'lucretius_book_6.txt']
  classifier = ClassifierReborn::Bayes.new books[0], books[1], books[2], books[3], books[4], books[5]

  books.each do |book|
    File.open("./training_text/lucretius_english/#{book}", "r") do |f|
      f.each_line do |line|
        classifier.train book, line
      end
    end
  end

  classifier_snapshot = Marshal.dump classifier
  # This is a string of bytes, you can persist it anywhere you like
  File.open("classifier.dat", "w") {|f| f.write(classifier_snapshot) }
end

def testing_classifier(input_text)
  data = File.read("classifier.dat")
  trained_classifier = Marshal.load data
  text_origin = trained_classifier.classify input_text #=> 'Interesting'
  return text_origin
end


testing_classifier("They circle their perennial courses round,
Timing their motions for increase of crops
And living creatures, or lest we should think")
