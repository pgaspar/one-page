class Page
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  include Mongoid::Paperclip
  
  field :slug
  field :title
  field :subtitle
  has_mongoid_attached_file :cover_photo

  belongs_to :user
  embeds_many :sections
  
  index :slug, :unique => true, :background => true
  index :created_at, :background => true

  validates :slug, 		:presence => true,
                   		:length => { :within => 3..24 }
  validates :title, 	:presence => true
  validates :subtitle, 	:length => { :maximum => 500 }

  def to_param
    slug
  end

  def self.with_slug(slug)
    first(:conditions => {:slug => slug})
  end
  
  def self.with_slug!(slug)
    with_slug(slug) or raise Mongoid::Errors::DocumentNotFound.new(Page,slug)
  end
end
