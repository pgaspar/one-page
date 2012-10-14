# String extensions
String.class_eval do
  def to_slug
    self.transliterate.downcase.gsub(/[^a-z0-9 ]/, ' ').strip.gsub(/[ ]+/, '-')
  end

  def transliterate
    # Unidecode gem is missing some hyphen transliterations
    #self.gsub(/[-‐‒–—―⁃−­]/, '-').to_ascii
  end
end