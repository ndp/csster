# -*- encoding: utf-8 -*-
require File.expand_path('../lib/csster/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Andrew Peterson"]
  gem.email         = ["andy@ndpsoftware.com"]
  gem.description   = %q{Concisely generate CSS style rules within Javascript}
  gem.summary       = %q{Concisely generate CSS style rules within Javascript}
  gem.homepage      = "http://github.com/ndp/csster"

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "csster"
  gem.require_paths = ["lib"]
  gem.version       = Csster::VERSION
end
