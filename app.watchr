# Run me with:
#
#   $ watchr less.watchr

# --------------------------------------------------
# Helpers
# --------------------------------------------------
def lessc(file_info)
  compile_file(file_info[1], "app")
end

def compile_file(path, file)
  puts "compiling #{file}... "
  puts "lessc #{file}.less"
  Dir.chdir(path) do
    `lessc.cmd #{file}.less #{file}.css`
  end
  puts 'done.'
end

# --------------------------------------------------
# Watchr Rules
# --------------------------------------------------
watch ( '(.*)\/(.*?)\.less$' ) {|md| lessc md }

# --------------------------------------------------
# Signal Handling
# --------------------------------------------------
# Ctrl-\
#Signal.trap('QUIT') do
#  puts " --- Compiling all .less files ---\n\n"
#  Dir['**/*.less'].each {|file| lessc file }
#  puts 'all compiled'
#end

# Ctrl-C
Signal.trap('INT')  { abort("\n") }
