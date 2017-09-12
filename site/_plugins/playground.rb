module Jekyll
    class RenderPlayground < Liquid::Tag
  
      def initialize(tag_name, text, tokens)
        super
        @text = text
      end
   
      def render(context)
        id = ""
        title = ""
        dir = ""
        entry = ""
        active = ""
        readOnly = false

        # Attempt to parse the JSON if any is passed in
        begin
            if( !@text.nil? && !@text.empty? )
                jdata = JSON.parse(@text)
                if( jdata.key?("id") )
                    id = jdata["id"].strip
                end
                if( jdata.key?("title") )
                    title = jdata["title"].strip
                end
                if( jdata.key?("dir") )
                    dir = jdata["dir"].strip
                end
                if( jdata.key?("entry") )
                    entry = jdata["entry"].strip
                end
                if( jdata.key?("active") )
                    active = jdata["active"].strip
                end
                if( jdata.key?("readOnly") )
                    readOnly = jdata["readOnly"].strip
                end
            end
        rescue #???
        end

        files = "[]"

        "<script>new PlaygroundBuilder(\'#{title}\', \'#{id}\', \'#{entry}\', \'#{active}\', #{readOnly},  #{files}, \'#{dir}\');</script>"
      end
    end
  end
  
  Liquid::Template.register_tag('playground', Jekyll::RenderPlayground)