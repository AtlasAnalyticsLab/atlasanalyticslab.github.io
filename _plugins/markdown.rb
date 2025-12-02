#==============================================================================
# Markdown Include Tag (_plugins/markdown.rb)
#
# Purpose:
#   Jekyll Liquid tag to include Markdown files from _includes directory
#   with Liquid preprocessing before Markdown rendering.
#
# Usage:
#   {% markdown filename.md %}
#
# Dependencies:
#   - kramdown (Markdown processor)
#
# Process:
#   1. Reads Markdown file from _includes/filename
#   2. Preprocesses with Liquid template engine
#   3. Converts Markdown to HTML with kramdown
#   4. Returns rendered HTML
#
# Example:
#   {% markdown team-intro.md %}
#==============================================================================

module Jekyll
  class MarkdownTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end
    require "kramdown"
    def render(context)
      tmpl = File.read File.join Dir.pwd, "_includes", @text
      site = context.registers[:site]
      tmpl = (Liquid::Template.parse tmpl).render site.site_payload
      html = Kramdown::Document.new(tmpl).to_html
    end
  end
end
Liquid::Template.register_tag('markdown', Jekyll::MarkdownTag)
