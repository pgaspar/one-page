class Page
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  
  field :slug
  field :title
  field :subtitle

  belongs_to :user
  embeds_many :sections
  
  index :slug, :unique => true, :background => true
  index :created_at, :background => true

  validates :slug, 		:presence => true,
                   		:length => { :within => 3..24 }
  validates :title, 	:presence => true
  validates :subtitle, 	:length => { :maximum => 500 }

  def self.with_slug(slug)
    first(:conditions => {:slug => slug})
  end
  
  def self.with_slug!(slug)
    with_slug(slug) or raise Mongoid::Errors::DocumentNotFound.new(Page,slug)
  end

  def self.new_with_content
    new(
      :title => 'Website',
      :subtitle => 'This is my new website!',
      :sections => [
        Section.new(:title => 'Welcome', :content => 'Welcome to my new website.'),
        Section.new(:title => 'Development', :content => 'Why this website is the best...'),
        Section.new(:title => 'About', :content => 'I\'m the one who made this website.')
      ]
    )
  end

end
