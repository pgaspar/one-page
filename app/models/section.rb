class Section
  include Mongoid::Document
  include Mongoid::Timestamps::Created

  field :title
  field :content

  embedded_in :page

  validates :title, :presence => true

end
