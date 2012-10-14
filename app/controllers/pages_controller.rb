class PagesController < ApplicationController
  before_filter :authenticate_user!, :except => [:show, :new]

  # GET /pages
  # GET /pages.json
  def index
    @pages = current_user.pages

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @pages }
    end
  end

  # GET /pages/1
  # GET /pages/1.json
  def show
    @page = Page.with_slug!(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @page }
    end
  end

  # GET /pages/new
  # GET /pages/new.json
  def new
    @page = Page.new_with_content

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @page }
    end
  end

  # GET /pages/1/edit
  def edit
    @page = current_user.pages.with_slug!(params[:id])
  end

  # POST /pages
  # POST /pages.json
  def create
    require 'pp'
    pp params[:page]
    @page = current_user.pages.new(params[:page])

    respond_to do |format|
      if @page.save
        format.html { redirect_to @page, :notice => 'Page was successfully created.' }
        format.json { puts "hi!"; render :json => @page, :status => :created, :location => @page }
      else
        format.html { render :action => "new" }
        format.json { render :json => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /pages/1
  # PUT /pages/1.json
  def update
    @page = current_user.pages.with_slug!(params[:id])

    respond_to do |format|
      p params
      set_destroy_on_missing_sections(@page)
      p params
      if @page.update_attributes(params[:page])
        format.html { redirect_to @page, :notice => 'Page was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.json
  def destroy
    @page = current_user.pages.with_slug!(params[:id])
    @page.destroy

    respond_to do |format|
      format.html { redirect_to pages_url }
      format.json { head :ok }
    end
  end

  private

  def set_destroy_on_missing_sections(page)
    current_sections_ids = page.sections.map(&:id)
    params_sections_ids = params[:page][:sections].map { |s| s[:id] }.compact
    remove_sections_ids = current_sections_ids & params_sections_ids
    remove_sections_ids.each do |section_id|
      params[:page][:sections] << {:id => section_id, :_destroy => true}
    end
  end
end
