class PagesController < ApplicationController
  before_filter :authenticate_user!, :except => [:show, :new, :create]

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
    @user = User.new unless signed_in?
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

    @page = Page.new(params[:page])

    # Try to login
    unless signed_in?
      @user = User.first(:conditions => {:email => params[:user][:email]})
      if @user 
        if @user.valid_password?(params[:user][:password])
          sign_in @user, :event => :authentication
        else
          respond_to do |format|
            format.html { render :action => "new" }
            format.json { render :json => 'Unsuccessful login.', :status => :unprocessable_entity }
          end
          return
        end
      end
    end

    # Try to sign up
    unless signed_in?
      @user = User.new(params[:user])
      if @user.save
        sign_in @user, :event => :authentication
      else
        respond_to do |format|
          format.html { render :action => "new" }
          format.json { render :json => 'Invalid sign up information.', :status => :unprocessable_entity }
        end
        return
      end
    end

    @page.user = current_user

    respond_to do |format|
      if @page.save
        format.html { redirect_to @page, :notice => 'Page was successfully created.' }
        format.json { render :json => @page, :status => :created, :location => @page }
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
    @page.attributes = params[:page]

    respond_to do |format|
      if @page.valid?
        @page.sections.destroy_all
        @page.update_attributes(params[:page])
        format.html { redirect_to @page, :notice => 'Page was successfully updated.' }
        format.json { render :json => {} }
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

end
