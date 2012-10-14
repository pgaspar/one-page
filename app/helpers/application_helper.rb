module ApplicationHelper

  def set_page_gradient_style(page)
    set_gradient_style(page.gradient_left, page.gradient_right)
  end

  def set_gradient_style(left_color, right_color)
    output =  "background-color: #{left_color};"
    output += "background-image: -moz-linear-gradient(45deg, #{left_color} 0%, #{right_color} 100%);"
    output += " background-image: -webkit-gradient(linear, left bottom, right top, color-stop(0%,#{left_color}), color-stop(100%,#{right_color}));"
    output += " background-image: -webkit-gradient(linear, left bottom, right top, color-stop(0%,#{left_color}), color-stop(100%,#{right_color}));"
    output += " background-image: -webkit-linear-gradient(45deg, #{left_color} 0%,#{right_color} 100%));"
    output += "background-image: -o-linear-gradient(45deg, #{left_color} 0%,#{right_color} 100%);"
    output += "background-image: -ms-linear-gradient(45deg, #{left_color} 0%,#{right_color} 100%);"
    output += "background-image: linear-gradient(45deg, #{left_color} 0%,#{right_color} 100%);"
    output += "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#{left_color}', endColorstr='#{left_color}',GradientType=1 );"
    "style=\"#{output}\"".html_safe
  end

end
