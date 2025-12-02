#==============================================================================
# Hide Custom BibTeX Filter (_plugins/hideCustomBibtex.rb)
#
# Purpose:
#   Jekyll Liquid filter to remove custom BibTeX keywords from output.
#   Filters out internal-only bibliography fields before rendering.
#
# Usage:
#   {{ bibtex_entry | hideCustomBibtex }}
#
# Configuration:
#   Reads filtered_bibtex_keywords from _config.yml
#
# Filtered Keywords (from _config.yml):
#   - abbr, abstract, arxiv, bibtex_show, html, pdf, selected,
#     supp, blog, code, poster, slides, website
#
# Function:
#   Removes lines containing any of the specified keywords from BibTeX output.
#==============================================================================

module Jekyll
  module HideCustomBibtex
    def hideCustomBibtex(input)
	  keywords = @context.registers[:site].config['filtered_bibtex_keywords']

	  keywords.each do |keyword|
		input = input.gsub(/^.*#{keyword}.*$\n/, '')
	  end

      return input
    end
  end
end

Liquid::Template.register_filter(Jekyll::HideCustomBibtex)